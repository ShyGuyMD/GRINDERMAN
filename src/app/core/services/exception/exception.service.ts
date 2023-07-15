import { Injectable, ErrorHandler } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ExceptionService implements ErrorHandler {

    constructor() { }

    handleError(error: any): void {
        // Error handling logic.
        console.error('Error: ', error);
    }
}
