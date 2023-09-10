import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddressRegistrationComponent } from './address-registration.component';
import { DeliveryService } from '@core/services';
import { deliveryServiceMock } from '@core/mocks/delivery.service.mock';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

describe('AddressRegistrationComponent', () => {
  let component: AddressRegistrationComponent;
  let fixture: ComponentFixture<AddressRegistrationComponent>;
  let _deliveryService: DeliveryService;
  

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AddressRegistrationComponent],
      imports:  [FormsModule, ReactiveFormsModule, DropdownModule],
      providers: [
        FormBuilder,
        { provide: DeliveryService, useValue: deliveryServiceMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressRegistrationComponent);
    component = fixture.componentInstance;

    _deliveryService = TestBed.inject(DeliveryService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
