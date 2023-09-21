import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '@core/services';

@Component({
    selector: 'app-blank-page',
    templateUrl: './blank-page.component.html',
    styleUrls: ['./blank-page.component.css']
})
export class BlankPageComponent {
    errorMessage: string | null = '';
    successMessage: string | null = '';

    orderId: string | null = '';
    orderStatus: string | null = '';

    constructor(
        private _route: ActivatedRoute,
        private _orderService: OrderService
    ) { }

    ngOnInit() {
        this.errorMessage = this._route.snapshot.queryParamMap.get('error');
        this.successMessage = this._route.snapshot.queryParamMap.get('success');
        this.orderId = this._route.snapshot.queryParamMap.get('external_reference');
        this.orderStatus = this._route.snapshot.queryParamMap.get('status');

        if (this.orderId) {
            const data = this.orderStatus === 'approved'
                    ? { status: 'completed', set_paid: true }
                    : { status: 'failed '}
            
            this._orderService.updateOrder(parseInt(this.orderId), data).subscribe({
                next: (response: any) => console.log('response', response),
                error: (e) => console.log('error', e)
            });
        }
    }
}
