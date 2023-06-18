// Angular Core
import { NgModule } from "@angular/core";

// Application Components
import { components } from "@core/components";

// Shared Modules
import { PrimengModule } from "@shared/primeng.module";
import { SharedModule } from "@shared/shared.module";


@NgModule({
    declarations: [...components],
    imports: [ SharedModule, PrimengModule ],
    providers: []
  })

  export class CoreModule { }