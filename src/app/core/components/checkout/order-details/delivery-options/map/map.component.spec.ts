import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { ApiService, DeliveryService } from '@core/services';
import { MapGeocoder } from '@angular/google-maps';
import { apiServiceMock } from '@core/mocks/api.service.mock';
import { deliveryServiceMock } from '@core/mocks/delivery.service.mock';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let _apiService: ApiService;
  let _geocoder: MapGeocoder;
  let _deliveryService: DeliveryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapComponent ],
      providers: [
        { provide: ApiService, useValue: apiServiceMock },
        { provide: MapGeocoder},
        { provide: DeliveryService, useValue: deliveryServiceMock },
      ],
    })
    .compileComponents();
  });

  beforeEach( () => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    _apiService = TestBed.inject(ApiService);
    _geocoder = TestBed.inject(MapGeocoder);
    _deliveryService = TestBed.inject(DeliveryService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
