// Angular Core
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

// Application Components
import { components } from "@core/components";

// Shared Modules
import { PrimengModule } from "@shared/primeng.module";
import { SharedModule } from "@shared/shared.module";
import { BookCreateComponent } from './components/book/book-create/book-create.component';


@NgModule({
    declarations: [...components, BookCreateComponent],
    imports: [ SharedModule, PrimengModule, FormsModule ],
    providers: []
  })

  export class CoreModule { }