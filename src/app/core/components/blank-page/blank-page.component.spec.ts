import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BlankPageComponent } from './blank-page.component';
import { routerMock } from '@core/mocks/router.mock';
import { activatedRouteMock } from '@core/mocks/activatedroute.mock';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '@core/services';
import { orderServiceMock } from '@core/mocks/order.service.mock';

describe('BlankPageComponent', () => {
  let component: BlankPageComponent;
  let fixture: ComponentFixture<BlankPageComponent>;

  let _orderService: OrderService;
  let _activatedRoute: ActivatedRoute;
  let _router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BlankPageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock },
        { provide: OrderService, useValue: orderServiceMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlankPageComponent);
    component = fixture.componentInstance;

    _activatedRoute = TestBed.inject(ActivatedRoute);
    _router = TestBed.inject(Router);
    _orderService = TestBed.inject(OrderService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the errorMessage from queryParamMap', () => {
    const errorMessage = 'Test error message';
    (<jest.Mock>_activatedRoute.snapshot.queryParamMap.get).mockReturnValue(errorMessage);

    // Create the component
    component = new BlankPageComponent(_activatedRoute, _orderService);
    // Trigger ngOnInit
    component.ngOnInit();
  
    expect(component.errorMessage).toBe(errorMessage);
    expect(activatedRouteMock.snapshot.queryParamMap.get).toHaveBeenCalledWith('error');
  });
  
});
