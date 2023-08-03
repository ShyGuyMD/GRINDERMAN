// Angular Core
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Application Components
import { components } from "@core/components";

// Shared Modules
import { PrimengModule } from "@shared/primeng.module";
import { SharedModule } from "@shared/shared.module";
import { services } from "./services";


@NgModule({
    declarations: [...components],
    imports: [SharedModule, PrimengModule, FormsModule, ReactiveFormsModule],
    providers: [...services]
})

export class CoreModule { }