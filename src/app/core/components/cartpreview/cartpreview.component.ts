import { Component } from '@angular/core';

@Component({
  selector: 'app-cartpreview',
  templateUrl: './cartpreview.component.html',
  styleUrls: ['./cartpreview.component.css']
})
export class CartpreviewComponent {
 public quantity: number = 3;
 public totalAmount: number = 1500;

}
