import { CartpreviewComponent } from "./cartpreview";
import { HeaderComponent } from "./header";
import { LayoutComponent } from "./layout";
import { MenuComponent } from "./menu";
import { SearchbarComponent } from "./searchbar";

export * from './layout';
export * from './menu';
export * from './searchbar';
export * from './cartpreview';
export * from './header';

export const components = [
    LayoutComponent,
    MenuComponent,
    SearchbarComponent,
    CartpreviewComponent,
    HeaderComponent
]