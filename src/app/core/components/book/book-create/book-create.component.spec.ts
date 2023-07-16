import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BookCreateComponent } from './book-create.component';
import { ActivatedRoute, Router } from '@angular/router';
import { WooCommerceApiService } from '@core/services';
import { routerMock } from '@core/mocks/router.mock';
import { activatedRouteMock } from '@core/mocks/activatedroute.mock';
import { wooCommerceApiServiceMock } from '@core/mocks/woocommerceapi.service.mock';
import { FormsModule } from '@angular/forms';

describe('BookCreateComponent', () => {
  let component: BookCreateComponent;
  let fixture: ComponentFixture<BookCreateComponent>;

  let _activatedRoute: ActivatedRoute;
  let _router: Router;
  let _wooCommerceApiService: WooCommerceApiService;

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      declarations: [ BookCreateComponent ],
      imports: [FormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock },
        { provide: WooCommerceApiService, useValue: wooCommerceApiServiceMock }
      ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BookCreateComponent);
    component = fixture.componentInstance;

    _wooCommerceApiService = TestBed.inject(WooCommerceApiService);
    _activatedRoute = TestBed.inject(ActivatedRoute);
    _router = TestBed.inject(Router);

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
