import { Component, Input } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-result-display',
  templateUrl: './result-display.component.html',
  styleUrls: ['./result-display.component.css'],
})
export class ResultDisplayComponent {
  @Input() errorTitle: string = 'Error';
  @Input() errorDescription: string = '';
  @Input() errorMessages: string[] = [];

  @Input() successTitle: string = 'Éxito';
  @Input() successDescription: string = '';

  constructor(private _config: DynamicDialogConfig) {
    if (_config.data) {
      this.errorMessages =
        _config.data.errorMessages !== undefined
          ? _config.data.errorMessages
          : this.errorMessages;
      this.errorTitle =
        _config.data.errorSubtitle !== undefined
          ? _config.data.errorSubtitle
          : this.errorTitle;
      this.errorDescription =
        _config.data.errorDescription !== undefined
          ? _config.data.errorDescription
          : this.errorDescription;
      this.successTitle =
        _config.data.successSubtitle !== undefined
          ? _config.data.successSubtitle
          : this.successTitle;
      this.successDescription =
        _config.data.successDescription !== undefined
          ? _config.data.successDescription
          : this.successDescription;
    }
  }
}
