import { BlankPageComponent } from "./blank-page";
import { BookCatalogueComponent, BookCreateComponent, BookDetailComponent } from "./book";
import { CartpreviewComponent } from "./cartpreview";
import { HeaderComponent } from "./header";
import { LandingAdminComponent, LandingComponent, LandingDevelopComponent } from "./landing";
import { LayoutComponent } from "./layout";
import { MenuComponent } from "./menu";
import { SearchbarComponent } from "./searchbar";
import { SectionTitleComponent } from "./section-title";
import { UserMenuComponent } from "./user-menu";
import { AdminCreateComponent, ClientCreateComponent, UserCreateComponent } from "./user/user-create";

export * from './blank-page';
export * from './cartpreview';
export * from './header';
export * from './layout';
export * from './menu';
export * from './searchbar';
export * from './book';
export * from './landing';
export * from './section-title';
export * from './user';
export * from './user-menu';


export const components = [
    AdminCreateComponent,
    BlankPageComponent,
    BookCreateComponent,
    BookCatalogueComponent,
    BookDetailComponent,
    CartpreviewComponent,
    ClientCreateComponent,
    HeaderComponent,
    LandingAdminComponent,
    LandingComponent,
    LandingDevelopComponent,
    LayoutComponent,
    MenuComponent,
    SearchbarComponent,
    SectionTitleComponent,
    UserCreateComponent,
    UserMenuComponent
]