import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactDetails } from '@core/models/contactDetails';
import { User } from '@core/models/user';
import { UserService } from '@core/services';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit{
  public contactDetailsForm!: FormGroup;
  @Output() formValidityChange = new EventEmitter<boolean>();

  @Input() contactDetails!: ContactDetails;

  constructor(
      private _formBuilder: FormBuilder,
      private _userService: UserService,
  ) { }

  ngOnInit(): void {
    this._userService.getActiveUser().subscribe((user)=>{
      this.initForm(user);
        this.contactDetailsForm.valueChanges.subscribe(() => {
          this.emitFormValidity();
          this.assignInput();
        });
    })
  }

  private initForm(user?: User): void {
    
      this.contactDetailsForm = this._formBuilder.group({
          email: [ user? user.email :'', [Validators.required, Validators.email]],
          name: [user? user.firstName :'', [Validators.required]],
          lastname: [user? user.lastName :'', Validators.required],
          phone: ['', Validators.required],
      });

  }

  private emitFormValidity(): void {
    this.formValidityChange.emit(this.contactDetailsForm.valid);
  }

  public assignInput(): void {
      this.contactDetails.email = this.contactDetailsForm.value.email;
      this.contactDetails.name = this.contactDetailsForm.value.name;
      this.contactDetails.lastname = this.contactDetailsForm.value.lastname;
      this.contactDetails.phone = this.contactDetailsForm.value.phone;
  }

}
