import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    private searchResultSubject = new BehaviorSubject<any[]>([]);
    searchResult$ = this.searchResultSubject.asObservable();
    keyword$ : BehaviorSubject<string> = new BehaviorSubject<string>('');

    setSearchResults(results: any[]) {
        this.searchResultSubject.next(results);
    }

    getSearchResults(): any[] {
        return this.searchResultSubject.value;
    }

    setKeyword(keyword: string) {
        this.keyword$.next(keyword);
    }

    getKeyword(): Observable<string>{
        return this.keyword$.asObservable();
    }
}
