import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-blank-page',
    templateUrl: './blank-page.component.html',
    styleUrls: ['./blank-page.component.css']
})
export class BlankPageComponent {
    errorMessage: string | null = '';

    constructor(private _route: ActivatedRoute) { }

    ngOnInit() {
        this.errorMessage = this._route.snapshot.queryParamMap.get('error');
    }
}
