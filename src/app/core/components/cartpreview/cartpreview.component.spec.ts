import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartpreviewComponent } from './cartpreview.component';

describe('CartpreviewComponent', () => {
  let component: CartpreviewComponent;
  let fixture: ComponentFixture<CartpreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartpreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
