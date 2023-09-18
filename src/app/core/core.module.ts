// Angular Core
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GoogleMapsModule } from "@angular/google-maps";

// Application Components
import { components } from "@core/components";
import { services } from "@core/services";

// Shared Modules
import { PrimengModule } from "@shared/primeng.module";
import { SharedModule } from "@shared/shared.module";
import { AgGridModule } from "ag-grid-angular";

@NgModule({
    declarations: [...components],
    imports: [SharedModule, PrimengModule, FormsModule, ReactiveFormsModule, GoogleMapsModule, AgGridModule],
    providers: [...services]
})

export class CoreModule { }