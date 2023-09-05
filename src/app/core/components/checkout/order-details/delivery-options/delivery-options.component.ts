import { Component, EventEmitter, Output } from '@angular/core';
import { CartService, DeliveryService } from '@core/services';
import { MIN_DELIVERY } from '@shared/constants';

@Component({
  selector: 'app-delivery-options',
  templateUrl: './delivery-options.component.html',
  styleUrls: ['./delivery-options.component.css'],
})
export class DeliveryOptionsComponent {
  selectedOption: string = '';
  isValidAddress: boolean = false;
  @Output() deliveryOptionChange: EventEmitter<string> = new EventEmitter();

  constructor(private _deliveryService: DeliveryService) {}

  ngOnInit(): void {
    this.selectedOption = 'pickup';
    this._deliveryService
      .getIsValidDeliveryAddress()
      .subscribe((response) => (this.isValidAddress = response));
  }

  public isElegibleForDelivery(): boolean {
    return (
      this._deliveryService.isValidDeliveryPurchase() && this.isValidAddress
    );
  }

  onOptionChange() {
    this.emitDeliveryOptionChange();
  }

  private emitDeliveryOptionChange(): void {
    this.deliveryOptionChange.emit(this.selectedOption);
  }
}
