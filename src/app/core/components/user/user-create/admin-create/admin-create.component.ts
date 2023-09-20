import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admin } from '@core/models/user';
import { UserService } from '@core/services';
import { Severity, UserRole, WordpressError } from '@shared/constants';
import { passwordValidator } from '@shared/customValidators';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-admin-create',
    templateUrl: './admin-create.component.html',
    styleUrls: ['./admin-create.component.css'],
})
export class AdminCreateComponent implements OnInit {

    public adminForm!: FormGroup;

    public admin: Admin = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        username: '',
        role: UserRole.ADMIN
    };

    public confirmPassword: string = '';
    public registrationError: boolean = false;
    public isLoading = false;

    constructor(
        private _formBuilder: FormBuilder,
        private _userService: UserService,
        private _messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.initForm();
    }

    private initForm(): void {
        this.adminForm = this._formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, passwordValidator()]],
            confirmPassword: ['', Validators.required],
        });
    }

    public save(): void {
        if (this.adminForm.invalid) {
            this._messageService.add(
                {severity: Severity.WARNING,
                summary: 'Advertencia',
                detail: 'Por favor, completa todos los campos obligatorios.'}
            )
            return;
        }
        this.adminForm.disable();
        this.assignInputToUser();
        this.isLoading = true;
        this._userService.registerAdministrator(this.admin).subscribe({
            next: (v: any) => {
                this.isLoading = false;
                this._messageService.add(
                    {severity: Severity.SUCCESS,
                    summary: `Felicidades`,
                    detail: `¡El registro de ${this.admin.firstName} ha sido exitoso!`}
                )
                this.adminForm.reset();
            },
            error: (e: any) => {
                if (e.error.code === WordpressError.USER_EXISTS) {
                    this.registrationError = true;
                    this.isLoading = false
                    this.adminForm.enable();
                    return;
                }
                this._messageService.add(
                    {severity: Severity.ERROR,
                    summary: '¡Upsss!',
                    detail: 'El registro no ha sido completado.'})
            },
            complete: () => {
                this.isLoading = false
                this.adminForm.enable();
            }
        });
    }

    public assignInputToUser(): void {
        this.admin.firstName = this.adminForm.value.firstname;
        this.admin.lastName = this.adminForm.value.lastname;
        this.admin.email = this.adminForm.value.email;
        this.admin.password = this.adminForm.value.password;
    }

    public isPasswordMismatch(): boolean {
        const password = this.adminForm.get('password')?.value;
        const confirmPassword = this.adminForm.get('confirmPassword')?.value;
        return password !== confirmPassword;
    }

    public validateEmail(): void {
        this.registrationError = false;
        this.adminForm.get('email')?.markAsTouched();
    }

    public validatePassword(): void {
        this.adminForm.get('password')?.markAsTouched();
    }

    public validatePasswordMatch(): void {
        this.adminForm.get('confirmPassword')?.markAsTouched();
    }
}
