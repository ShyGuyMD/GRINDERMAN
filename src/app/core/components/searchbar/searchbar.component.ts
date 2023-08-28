import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService, WooCommerceApiService } from '@core/services';
import { SharedService } from '@core/services/shared';
import { CATALOGUE } from '@shared/constants';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-searchbar',
    templateUrl: './searchbar.component.html',
    styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {

    searchTerm = new Subject<string>();
    isLoading = false;

    constructor(
        private _sharedService: SharedService,
        private _wooCommerceAPIService: WooCommerceApiService,
        private _router: Router,
        private _navigationService: NavigationService) { }

    ngOnInit() {
        this.searchTerm.pipe(
            debounceTime(300) // tiempo en ms a esperar por otro keyup antes de mandar el request
        ).subscribe({
            next: (v) => {
                this.isLoading = true;
                this.performSearch(v)
            },
            error: (e) => console.log('Error Debouncing: ', e)
        });
    }

    handleSearchEvent(keyword: string) {
        this.searchTerm.next(keyword);
    }

    performSearch(keyword: string) {
      if (this._router.url !== CATALOGUE) {
        this._navigationService.navigateTo(CATALOGUE);
      }
      this._wooCommerceAPIService.getProductsByKeyword(keyword).subscribe({
        next: (v) => this._sharedService.setSearchResults(v),
        error: (e) => console.log('Error in Search API: ', e),
        complete: () => (this.isLoading = false),
      });
      this._sharedService.setKeyword(keyword);
    }

}
