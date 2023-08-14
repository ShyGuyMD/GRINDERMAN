import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { UserService } from '@core/services';
import {
  CHECKOUT_ADMIN_ROUTEMAPPINGS,
  CHECKOUT_ADMIN_STEPS,
  CHECKOUT_ROUTEMAPPINGS,
  CHECKOUT_STEPS,
} from '@shared/constants';
import { filter } from 'rxjs';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
    public steps: any[] = [];
    activeIndex: number = 0;
    stepRouteMappings: { [key: string]: number } = {};

    constructor(
        private _router: Router,
        private _userService: UserService,
    ) { }

    ngOnInit(): void {
        if (this._userService.isAdminUser()) {
            this.stepRouteMappings = CHECKOUT_ADMIN_ROUTEMAPPINGS;
            this.steps = CHECKOUT_ADMIN_STEPS;
        } else {
            this.stepRouteMappings = CHECKOUT_ROUTEMAPPINGS;
            this.steps = CHECKOUT_STEPS;
        }

    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateActiveIndex();
      });
  }

    private updateActiveIndex(): void {
        const currentRoute = this._router.url;

        this.activeIndex = this.stepRouteMappings[currentRoute];

        console.log(this.stepRouteMappings, this.activeIndex, currentRoute);
    }
}
