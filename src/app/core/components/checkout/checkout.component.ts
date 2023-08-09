import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  public steps: any[] = [];
  activeIndex: number = 0;

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.steps = [
      { label: 'Mi Carrito' },
      { label: 'Envio' },
      { label: 'Pago' }
    ];

    this._activatedRoute.url
      .pipe(filter(() => this._router.navigated))
      .subscribe(() => {
        this.updateActiveIndex();
      });
  }

  private updateActiveIndex(): void {
    const currentRoute = this._router.url;
    const stepRouteMappings: { [key: string]: number } = {
      '/checkout/view-cart': 0,
      '/checkout/delivery-options': 1,
      '/checkout/payment': 2
    };

    this.activeIndex = stepRouteMappings[currentRoute];
  }
  
}
