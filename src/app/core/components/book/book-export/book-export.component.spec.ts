import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookExportComponent } from './book-export.component';

describe('BookExportComponent', () => {
  let component: BookExportComponent;
  let fixture: ComponentFixture<BookExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookExportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
