import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlaySpinnerComponent } from './overlay-spinner.component';

describe('OverlayComponent', () => {
  let component: OverlaySpinnerComponent;
  let fixture: ComponentFixture<OverlaySpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverlaySpinnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverlaySpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
