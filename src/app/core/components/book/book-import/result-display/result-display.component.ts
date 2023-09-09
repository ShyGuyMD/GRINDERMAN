import { Component, Input} from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-result-display',
  templateUrl: './result-display.component.html',
  styleUrls: ['./result-display.component.css']
})
export class ResultDisplayComponent {
  
  @Input() errorTitle: string = 'Error';
  @Input() errorDescription: string = '';
  @Input() errorMessages: string[] = [];

  @Input() successTitle: string = 'Éxito';
  @Input() successDescription: string = '';

  constructor(private _config: DynamicDialogConfig) {
    if (_config.data) {
      this.errorMessages = _config.data.errorMessages;
      this.errorTitle = _config.data.errorSubtitle;
      this.errorDescription = _config.data.errorDescription;
      this.successTitle = _config.data.successSubtitle;
      this.successDescription = _config.data.successDescription;
    }
  }
}
