import { CartpreviewComponent } from "./cartpreview";
import { HeaderComponent } from "./header";
import { LayoutComponent } from "./layout";
import { MenuComponent } from "./menu";
import { SearchbarComponent } from "./searchbar";
import { UserMenuComponent } from "./user-menu";

export * from './layout';
export * from './menu';
export * from './searchbar';
export * from './cartpreview';
export * from './header';
export * from './user-menu';

export const components = [
    LayoutComponent,
    MenuComponent,
    SearchbarComponent,
    CartpreviewComponent,
    HeaderComponent,
    UserMenuComponent
]