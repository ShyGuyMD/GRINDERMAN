import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailureComponent } from './failure.component';
import { DynamicDialogComponent, DynamicDialogRef } from 'primeng/dynamicdialog';

describe('FailureComponent', () => {
  let component: FailureComponent;
  let fixture: ComponentFixture<FailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailureComponent ],
      providers: [
        DynamicDialogRef
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
