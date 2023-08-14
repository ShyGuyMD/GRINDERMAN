import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admin } from '@core/models/user';
import { NavigationService, UserService } from '@core/services';
import { BLANK_PAGE, UserRole, WoocommerceError } from '@shared/constants';
import { passwordValidator } from '@shared/customValidators';

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
        private _navigationService: NavigationService,
    ) { }

    ngOnInit(): void {
        this.initForm();
    }

    private initForm(): void {
        this.adminForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, passwordValidator()]],
            confirmPassword: ['', Validators.required],
        });
    }

    public save(): void {
        if (this.adminForm.invalid) {
            console.log('invalid!');
            return;
        }
        this.assignInputToUser();
        this.isLoading = true;
        this._userService.registerAdministrator(this.admin).subscribe({
            next: (v: any) => {
                this.isLoading = false;
                console.log('submitting: ', this.admin);
                console.log('response: ', v);
                this.adminForm.reset();
                const successMessage = 'The admin was succesfully created!';
                this._navigationService.navigateTo(BLANK_PAGE, undefined, successMessage);
            },
            error: (e: any) => {
                const errorMessage = 'Error creating admin.';
                console.log('error: ', e.error.code);
                if (e.error.code === WoocommerceError.EMAIL_EXISTS) {
                    this.registrationError = true;
                    this.isLoading = false;
                    return;
                }
                this._navigationService.navigateTo(BLANK_PAGE, errorMessage);
            }
        });

    }

    public assignInputToUser(): void {
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
