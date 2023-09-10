import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-overlay-spinner',
  templateUrl: './overlay-spinner.component.html',
  styleUrls: ['./overlay-spinner.component.css']
})
export class OverlaySpinnerComponent {
 @Input() showOverlaySpinner : boolean = false;
}
