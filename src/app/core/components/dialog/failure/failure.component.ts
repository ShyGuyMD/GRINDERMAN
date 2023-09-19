import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-failure',
    templateUrl: './failure.component.html',
    styleUrls: ['./failure.component.css']
})
export class FailureComponent {

    constructor(public _dialogRef: DynamicDialogRef) { }

    public closeDialog() {
        this._dialogRef.close();
    }
}
