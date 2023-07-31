import { ComponentFixture, waitForAsync, TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { activatedRouteMock } from "@core/mocks/activatedroute.mock";
import { bookServiceMock } from "@core/mocks/book.service.mock";
import { dialogServiceMock } from "@core/mocks/dialog.service.mock";
import { routerMock } from "@core/mocks/router.mock";
import { BookService } from "@core/services";
import { DialogService } from "primeng/dynamicdialog";
import { BookDetailComponent } from "./book-detail.component";

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  let _activatedRoute: any;
  let _router: any;
  let _bookService: BookService;
  let _dialogService: DialogService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BookDetailComponent],
        providers: [
          { provide: ActivatedRoute, useValue: activatedRouteMock },
          { provide: Router, useValue: routerMock },
          { provide: BookService, useValue: bookServiceMock },
          { provide: DialogService, useValue: dialogServiceMock }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;

    _bookService = TestBed.inject(BookService);
    _dialogService = TestBed.inject(DialogService);
    _activatedRoute = TestBed.inject(ActivatedRoute);
    _router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  
});