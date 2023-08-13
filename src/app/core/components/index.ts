import { BlankPageComponent } from "./blank-page";
import { BookCatalogueComponent, BookCreateComponent, BookDetailComponent, BookEditModalComponent } from "./book";
import { CartPreviewComponent } from "./cart-preview";
import { CartAdminComponent, CartComponent, CartItemComponent, CheckoutComponent, ContactDetailsComponent, DeliveryOptionsComponent, ItemSearchComponent, OrderDetailsComponent, OrderSummaryComponent} from "./checkout";

import { HeaderComponent } from "./header";
import { LandingAdminComponent, LandingComponent, LandingDevelopComponent } from "./landing";
import { LayoutComponent } from "./layout";
import { LoginComponent } from "./login";
import { MenuComponent } from "./menu";
import { SearchbarComponent } from "./searchbar";
import { SectionTitleComponent } from "./section-title";
import { UserMenuComponent } from "./user-menu";
import { AdminCreateComponent, ClientCreateComponent, UserCreateComponent } from "./user";

export * from './blank-page';
export * from './cart-preview';
export * from './checkout';
export * from './header';
export * from './layout';
export * from './login';
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
    BookEditModalComponent,
    CartAdminComponent,
    CartComponent,
    CartItemComponent,
    CartPreviewComponent,
    CheckoutComponent,
    ClientCreateComponent,
    ContactDetailsComponent,
    DeliveryOptionsComponent,
    HeaderComponent,
    ItemSearchComponent,
    LandingAdminComponent,
    LandingComponent,
    LandingDevelopComponent,
    LayoutComponent,
    LoginComponent,
    MenuComponent,
    OrderDetailsComponent,
    OrderSummaryComponent,
    SearchbarComponent,
    SectionTitleComponent,
    UserCreateComponent,
    UserMenuComponent
]