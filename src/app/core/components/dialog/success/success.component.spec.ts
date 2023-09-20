import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessComponent } from './success.component';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

describe('SuccessComponent', () => {
  let component: SuccessComponent;
  let fixture: ComponentFixture<SuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessComponent ],
      providers: [
        DynamicDialogRef
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
