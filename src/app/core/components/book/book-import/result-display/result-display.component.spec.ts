import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResultDisplayComponent } from './result-display.component';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { dialogServiceMock } from '@core/mocks/dialog.service.mock';

describe('ResultDisplayComponent', () => {
  let component: ResultDisplayComponent;
  let fixture: ComponentFixture<ResultDisplayComponent>;
  let _dynamicDialogConfig: DynamicDialogConfig;
  let _dialogService: DialogService;

  const configMock: Partial<DynamicDialogConfig> = {
    data: {
    },
  };
  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      declarations: [ ResultDisplayComponent ],
      providers: [
        { provide: DynamicDialogConfig, useValue: configMock },
        { provide: DialogService, useValue: dialogServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(()=>{
    fixture = TestBed.createComponent(ResultDisplayComponent);
    component = fixture.componentInstance;
    _dynamicDialogConfig = TestBed.inject(DynamicDialogConfig);
    _dialogService = TestBed.inject(DialogService);

    fixture.detectChanges();
  })
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
