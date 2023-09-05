import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City } from '@core/models/city';
import { Departamento } from '@core/models/departamento';
import { DeliveryService } from '@core/services';

@Component({
  selector: 'app-address-registration',
  templateUrl: './address-registration.component.html',
  styleUrls: ['./address-registration.component.css'],
})
export class AddressRegistrationComponent {
  addressForm!: FormGroup;
  departamentosDict: { [key: string]: City[] } = {};
  departamentos: string[] = [];
  localidades: City[] = [];
  @Output() formValidityChange = new EventEmitter<boolean>();

  constructor(
    private _formBuilder: FormBuilder,
    private _deliveryService: DeliveryService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getCityData();
    this.addressForm.valueChanges.subscribe(() => {
      this.emitFormValidity();
    });
  }

  private initForm(): void {
    this.addressForm = this._formBuilder.group({
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      department: ['', Validators.required],
    });
  }

  public searchAddress(): void {
    if (this.addressForm.valid) {
      const formData = this.addressForm.value;
      this._deliveryService.setDeliveryMapAddress(
        `${formData.street}, ${formData.city.localidad}, ${formData.department}, Uruguay`
      );
    }
  }

  private emitFormValidity(): void {
    const isValid =this.addressForm.valid
    if(isValid){
        const formData = this.addressForm.value;
        this._deliveryService.setDeliveryMapAddress(
          `${formData.street}, ${formData.city.localidad}, ${formData.department}, Uruguay`
        );
    }
    this.formValidityChange.emit(isValid);
  }

  public getCities(): void {
    const formData = this.addressForm.value;
    console.log(this.departamentosDict);
    this.localidades =
      this.departamentosDict[formData.department.toUpperCase()];
  }

  private getCityData(): void {
    this._deliveryService
      .getDepartamentos()
      .subscribe((departamentos: Departamento[]) => {
        console.log(departamentos);
        departamentos.forEach((departamento) => {
          this.departamentos.push(departamento.name);
          this.departamentosDict[departamento.name] = departamento.cities.sort((a, b) => a.localidad.localeCompare(b.localidad));
        });
      });
  }
}
