import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    private searchResultSubject = new BehaviorSubject<any[]>([]);
    searchResult$ = this.searchResultSubject.asObservable();

    setSearchResults(results: any[]) {
        this.searchResultSubject.next(results);
    }

    getSearchResults(): any[] {
        return this.searchResultSubject.value;
    }
}
