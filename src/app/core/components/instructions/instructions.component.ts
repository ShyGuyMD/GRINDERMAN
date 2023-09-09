import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent {
  @Input() instructions: { [title: string]: string[] } = {};
  @Input() ordered: { [boolean: string]: boolean } = {};
}
