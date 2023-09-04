import { Component } from '@angular/core';
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

  constructor(
    private _formBuilder: FormBuilder,
    private _deliveryService: DeliveryService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getCityData();
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
      this._deliveryService.setMapAddress(
        `${formData.street}, ${formData.city.localidad}, ${formData.department}, Uruguay`
      );
      this._deliveryService.setDeliveryArea(formData.city.area);
    }
  }

  public getCities(): void {
    const formData = this.addressForm.value;
    console.log(this.departamentosDict);
    this.localidades =
      this.departamentosDict[formData.department.toUpperCase()];
  }

  private getCityData(): void {
    this._deliveryService
      .loadCities()
      .subscribe((departamentos: Departamento[]) => {
        console.log(departamentos);
        departamentos.forEach((departamento) => {
          this.departamentos.push(departamento.name);
          this.departamentosDict[departamento.name] = departamento.cities.sort(
            (a, b) => a.localidad.localeCompare(b.localidad)
          );
        });
        this.departamentos.sort();
      });
  }
}
