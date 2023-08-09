import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    constructor() { }

    setItem(key: string, data: any): void {
        localStorage.setItem(key, JSON.stringify(data));
    }

    getItem(key: string): string {
        return localStorage.getItem(key) || '';
    }

    removeItem(key: string): void {
        localStorage.removeItem(key);
    }
}
