import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '@core/services';
import { CHECKOUT_CART } from '@shared/constants';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {

  constructor(private _navigationService: NavigationService){}

  
  public goToNextStep(): void {
    this._navigationService.navigateTo('');
  }

  public goToPreviousStep(): void {
    this._navigationService.navigateTo(CHECKOUT_CART);
  }
}
