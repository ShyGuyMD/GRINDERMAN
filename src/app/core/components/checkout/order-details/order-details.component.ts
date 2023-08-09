import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {

  constructor(private _router: Router){}

  
  public goToNextStep(): void {
    this._router.navigate(['']);
  }

  public goToPreviousStep(): void {
    this._router.navigate(['/checkout/cart']);
  }
}
