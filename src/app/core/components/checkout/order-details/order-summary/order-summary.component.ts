import { Component } from '@angular/core';
import { CartItem } from '@core/models/cartItem';
import { Coupon } from '@core/models/coupon';
import { CartService } from '@core/services';
import { CouponType } from '@shared/constants';

@Component({
    selector: 'app-order-summary',
    templateUrl: './order-summary.component.html',
    styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent {
    cartItems: CartItem[] = [];
    cartTotal: number = 0;
    discount: number = 0;
    comission: number = 0;

    constructor(private _cartService: CartService) { }

    ngOnInit(): void {
        this._cartService.getCartItems().subscribe((cartItems) => {
            this.cartItems = cartItems;
        });
        this.cartTotal = this._cartService.getTotalAmountWithCoupons();
        this._cartService.getCoupon().subscribe((coupon)=>{
            if( coupon !== null ){
                if(coupon.type === CouponType.CREDIT){
                    this.discount = coupon.value;
                }else{
                    this.discount = this.getPercentCouponCredit(coupon);
                }
            }else{
                this.discount = 0;
            }
            console.log("coupon", coupon, this.discount)
        })
        this._cartService.getMercadoLibre().subscribe((isMercadoLibre)=>{
            if(isMercadoLibre){
                const mlCoupon = this._cartService.getComisionMercadoLibre();
                if(mlCoupon !== null){
                    this.comission = this.getPercentCouponCredit(mlCoupon);
                }
            }else{
                this.comission = 0;
            }
        })

    }

    getLineTotal(selectedItem: CartItem): number {
        return selectedItem.quantity * selectedItem.book.price;
    }

    getPercentCouponCredit( coupon: Coupon ){
        return (coupon.value / 100) * this.cartTotal;
    }

}