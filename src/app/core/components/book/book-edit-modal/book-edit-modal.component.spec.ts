import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookEditModalComponent } from './book-edit-modal.component';

describe('BookEditModalComponent', () => {
  let component: BookEditModalComponent;
  let fixture: ComponentFixture<BookEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookEditModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
