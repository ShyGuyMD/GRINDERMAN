import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingDevelopComponent } from './landing-develop.component';

describe('LandingDevelopComponent', () => {
  let component: LandingDevelopComponent;
  let fixture: ComponentFixture<LandingDevelopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingDevelopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingDevelopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
