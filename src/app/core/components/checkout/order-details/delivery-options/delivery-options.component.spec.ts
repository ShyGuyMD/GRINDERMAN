import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeliveryOptionsComponent } from './delivery-options.component';
import { DeliveryService } from '@core/services';
import { deliveryServiceMock } from '@core/mocks/delivery.service.mock';

describe('DeliveryOptionsComponent', () => {
  let component: DeliveryOptionsComponent;
  let fixture: ComponentFixture<DeliveryOptionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveryOptionsComponent],
      providers: [
        { provide: DeliveryService, useValue: deliveryServiceMock },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(DeliveryOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
