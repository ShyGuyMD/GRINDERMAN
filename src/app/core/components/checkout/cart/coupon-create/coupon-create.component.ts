import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Coupon } from '@core/models/coupon';
import { CartService } from '@core/services';
import { CouponType } from '@shared/constants';

@Component({
  selector: 'app-coupon-create',
  templateUrl: './coupon-create.component.html',
  styleUrls: ['./coupon-create.component.css'],
})
export class CouponCreateComponent {
  public couponForm!: FormGroup;
  public credit: string = CouponType.CREDIT;
  public percent: string = CouponType.PERCENT;
  public coupon: Coupon = {
    value: 0,
    type: CouponType.PERCENT,
  };
  public isAllowed: boolean = true;

  constructor(
    private _formBuilder: FormBuilder,
    private _cartService: CartService
  ) {}

  ngOnInit(): void {
    this._cartService
      .getMercadoLibre()
      .subscribe((mercadoLibre) => {
        this.isAllowed = !mercadoLibre
        if(this.isAllowed){
          this.setCoupon();
        }
      });
    this.initForm();
  }

  private initForm(): void {
    this.couponForm = this._formBuilder.group({
      value: ['', [Validators.required]],
      type: [CouponType.PERCENT],
    });
    this.couponForm.valueChanges.subscribe(() => {
      this.setCoupon();
    });
  }

  private setCoupon():void{
    const formData = this.couponForm.value;
    this.coupon = {
      value: formData.value,
      type: formData.type,
    };
    if (!this.coupon.value || this.coupon.value === 0) {
      this._cartService.setCoupon(null);
    } else {
      this._cartService.setCoupon(this.coupon);
    }
  }
  
}
