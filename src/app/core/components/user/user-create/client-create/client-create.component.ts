import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Client } from '@core/models/user';
import { UserService } from '@core/services';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent {
  @ViewChild('clientForm') clientForm!: NgForm;
  client: Client = {
    email: '',
    password: '',
  };
  confirmPassword: string = '';

  public emailError: boolean = false;
  public passwordError: boolean = false;
  public passwordMismatchError: boolean = false;

  public emailErrorMessage: string = '';
  public passwordErrorMessage: string = '';

  public isLoading: boolean = false;

  constructor(private _userService: UserService) {}

  public save(): void {
    if (!this._userService.validatePassword(this.client.password)) {
      // Password validation failed
      return;
    }

    // Register the client
    this._userService.registerClient(this.client);

    // Reset form
    this.cleanup();
  }

  private resetForm(){
    this.clientForm.resetForm();
  }

  public cleanup(): void {
    console.log('clicked on save and new!');
    this.save();
    this.resetForm();
}
}
