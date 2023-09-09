import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CartAdminComponent } from './cart-admin.component';
import { CartService, NavigationService } from '@core/services';
import { cartServiceMock } from '@core/mocks/cart.service.mock';
import { navigationServiceMock } from '@core/mocks/navigation.service.mock';

describe('CartAdminComponent', () => {
  let component: CartAdminComponent;
  let fixture: ComponentFixture<CartAdminComponent>;
  let _cartService: CartService;
  let _navigationService: NavigationService;


  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      declarations: [ CartAdminComponent ],
      providers: [
        { provide: CartService, useValue: cartServiceMock },
        { provide: NavigationService, useValue: navigationServiceMock },
      ]
    })
    .compileComponents();
  }));


  beforeEach(()=>{
    fixture = TestBed.createComponent(CartAdminComponent);
    component = fixture.componentInstance;
    
    _cartService = TestBed.inject(CartService);
    _navigationService = TestBed.inject(NavigationService);
 

    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
