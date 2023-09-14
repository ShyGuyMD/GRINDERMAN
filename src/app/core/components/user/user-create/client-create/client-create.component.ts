import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '@core/models/user';
import { NavigationService, UserService } from '@core/services';
import { BLANK_PAGE, LOGIN, Severity, UserRole, WoocommerceError } from '@shared/constants';
import { passwordValidator } from '@shared/customValidators';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-client-create',
    templateUrl: './client-create.component.html',
    styleUrls: ['./client-create.component.css'],
})
export class ClientCreateComponent implements OnInit {

    public clientForm!: FormGroup;

    public client: Client = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        username: '',
        role: UserRole.CLIENT
    };

    public confirmPassword: string = '';
    public registrationError: boolean = false;
    public isLoading = false;

    constructor(
        private _formBuilder: FormBuilder,
        private _userService: UserService,
        private _navigationService: NavigationService,
        private _messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.initForm();
    }

    private initForm(): void {
        this.clientForm = this._formBuilder.group({
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, passwordValidator()]],
            confirmPassword: ['', Validators.required],
        });
    }

    public save(): void {
        if (this.clientForm.invalid) {
            console.log('invalid!');
            return;
        }
        this.assignInputToUser();
        this.isLoading = true;
        this.clientForm.disable();
        this._userService.registerClient(this.client).subscribe({
            next: (v: any) => {
                this._messageService.add(
                    {severity: Severity.SUCCESS,
                    summary: `Felicidades ${this.client.firstName}`,
                    detail: '¡Tu registro ha sido exitoso!'}
                )
                this.isLoading = false;
                this.clientForm.reset();
                this._navigationService.navigateTo(LOGIN);
            },
            error: (e: any) => {
                this.clientForm.enable();
                if (e.error.code === WoocommerceError.EMAIL_EXISTS) {
                    this.registrationError = true;
                    this.isLoading = false;
                    return;
                }
                this._messageService.add(
                    {severity: Severity.ERROR,
                    summary: '¡Upsss!',
                    detail: 'Tu registro no ha sido completado.'})
            }
        });

    }

    public assignInputToUser(): void {
        this.client.email = this.clientForm.value.email;
        this.client.password = this.clientForm.value.password;
    }

    public isPasswordMismatch(): boolean {
        const password = this.clientForm.get('password')?.value;
        const confirmPassword = this.clientForm.get('confirmPassword')?.value;
        return password !== confirmPassword;
    }

    public validateEmail(): void {
        this.registrationError = false;
        this.clientForm.get('email')?.markAsTouched();
    }

    public validatePassword(): void {
        this.clientForm.get('password')?.markAsTouched();
    }

    public validatePasswordMatch(): void {
        this.clientForm.get('confirmPassword')?.markAsTouched();
    }
}
