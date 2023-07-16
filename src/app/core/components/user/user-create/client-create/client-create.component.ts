import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '@core/models/user';
import { UserService } from '@core/services';
import { WoocommerceError } from '@shared/constants';
import { passwordValidator } from '@shared/customValidators';

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
  };
  public confirmPassword: string = '';
  public registrationError: boolean = false;
  public isLoading = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.clientForm = this._formBuilder.group({
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
      this._userService.registerClient(this.client).subscribe({
          next: (v: any) => {
              this.isLoading = false;
              console.log('submitting: ', this.client);
              console.log('response: ', v);
              this.clientForm.reset();
              const successMessage = 'The client was succesfully created!';
              this._router.navigate(['/blank'], { queryParams: { success: successMessage } });
          },
          error: (e: any) => {
              const errorMessage = 'Error creating client.';
              console.log('error: ', e.error.code);
              if( e.error.code === WoocommerceError.EMAIL_EXISTS){
               this.registrationError = true;
               this.isLoading= false;
               return; 
              }
              this._router.navigate(['/blank'], { queryParams: { error: errorMessage } });
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
