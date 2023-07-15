import { BlankPageComponent } from "./blank-page";
import { BookCatalogComponent, BookCreateComponent, BookDetailComponent } from "./book";
import { CartpreviewComponent } from "./cartpreview";
import { HeaderComponent } from "./header";
import { LandingComponent } from "./landing";
import { LayoutComponent } from "./layout";
import { MenuComponent } from "./menu";
import { SearchbarComponent } from "./searchbar";
import { UserMenuComponent } from "./user-menu";

export * from './blank-page';
export * from './cartpreview';
export * from './header';
export * from './layout';
export * from './menu';
export * from './searchbar';
export * from './user-menu';
export * from './book';
export * from './landing';

export const components = [
    BlankPageComponent,
    BookCreateComponent,
    BookCatalogComponent,
    BookDetailComponent,
    CartpreviewComponent,
    HeaderComponent,
    LandingComponent,
    LayoutComponent,
    MenuComponent,
    SearchbarComponent,
    UserMenuComponent
]