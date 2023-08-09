import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  public steps: any[] = [];
  activeIndex: number = 0;

  ngOnInit(): void {
    this.steps = [
      { label: 'Mi Carrito' },
      { label: 'Envio' },
      { label: 'Pago' }
    ];
  }

  goToPreviousStep(): void {
    this.activeIndex -= 1;
  }

  goToNextStep(): void {
    this.activeIndex += 1;
  }
  
}
