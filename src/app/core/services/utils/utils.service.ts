import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UtilsService {
    constructor() { }

    public sanitizeAndRemoveHtmlTags(input: string): string {
        return input.replace(/<[^>]*>/g, '');
    }

    public cloneObject(obj: any): any {
        return JSON.parse(JSON.stringify(obj));
    }

    public removeDiacriticalMarks(input: string): string {
        const normalizedString = input.normalize('NFD');
        return normalizedString.replace(/[\u0300-\u036f]/g, '');
    }

    public generateRandomAlphanumericString(length: number): string {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            result += charset.charAt(randomIndex);
        }

        return result;
    }
}
