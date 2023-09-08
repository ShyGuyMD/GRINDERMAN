import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CartPreviewComponent } from './cart-preview.component';
import { BookService, NavigationService } from '@core/services';
import { bookServiceMock } from '@core/mocks/book.service.mock';
import { navigationServiceMock } from '@core/mocks/navigation.service.mock';

describe('CartPreviewComponent', () => {
    let component: CartPreviewComponent;
    let fixture: ComponentFixture<CartPreviewComponent>;
    let _bookService: BookService;
    let _navigationService: NavigationService;

    beforeEach(waitForAsync( () => {
        TestBed.configureTestingModule({
          declarations: [ CartPreviewComponent ],
          providers: [
            { provide: BookService, useValue: bookServiceMock },
            { provide: NavigationService, useValue: navigationServiceMock },
          ]
        })
        .compileComponents();
      }));


      beforeEach(()=>{
        fixture = TestBed.createComponent(CartPreviewComponent);
        component = fixture.componentInstance;
        
        _bookService = TestBed.inject(BookService);
        _navigationService = TestBed.inject(NavigationService);
     
    
        fixture.detectChanges();
      })

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
