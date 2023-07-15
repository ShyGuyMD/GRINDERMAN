import { Component } from '@angular/core';
import { WooCommerceApiService } from '@core/services';
import { SharedService } from '@core/services/shared';
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
        private _wooCommerceAPIService: WooCommerceApiService) { }

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
        this._wooCommerceAPIService.getProductsByKeyword(keyword).subscribe({
            next: (v) => this._sharedService.setSearchResults(v),
            error: (e) => console.log('Error in Search API: ', e),
            complete: () => this.isLoading = false
        });
    }

}
