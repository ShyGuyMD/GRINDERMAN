// Angular Core
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Application Components
import { components } from "@core/components";
import { services } from "@core/services";

// Shared Modules
import { PrimengModule } from "@shared/primeng.module";
import { SharedModule } from "@shared/shared.module";

@NgModule({
    declarations: [...components],
    imports: [SharedModule, PrimengModule, FormsModule, ReactiveFormsModule],
    providers: [...services]
})

export class CoreModule { }