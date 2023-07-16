import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Admin } from '@core/models/user';
import { UserService } from '@core/services';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.css']
})
export class AdminCreateComponent {
  @ViewChild('adminForm') adminForm!: NgForm;
  admin: Admin = {
    email: '',
    password: '',
  };
  isLoading: boolean = false;

  constructor(private _userService: UserService) {}

  public save(): void {
    if (!this._userService.validatePassword(this.admin.password)) {
      // Password validation failed
      return;
    }

    // Register the administrator
    this._userService.registerAdministrator(this.admin);

    // Reset form
    this.cleanup();
  }

  private resetForm(){
    this.adminForm.resetForm();
  }

  public cleanup(): void {
    console.log('clicked on save and new!');
    this.save();
    this.resetForm();
}

}
