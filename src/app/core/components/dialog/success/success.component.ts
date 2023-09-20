import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-success',
    templateUrl: './success.component.html',
    styleUrls: ['./success.component.css']
})
export class SuccessComponent { 
    
    constructor(public _dialogRef: DynamicDialogRef) {}

    public closeDialog() {
        this._dialogRef.close();
    }
}
