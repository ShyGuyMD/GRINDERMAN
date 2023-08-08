import { ApiService } from './api';
import { AuthenticationService } from './authentication';
import { BookService } from './book';
import { CartService } from './cart';
import { ExceptionService } from './exception';
import { LocalStorageService } from './local-storage';
import { ProductService } from './product';
import { SharedService } from './shared';
import { UserService } from './user';
import { UtilsService } from './utils';
import { WooCommerceApiService } from './woo-commerce';

export * from './api';
export * from './authentication';
export * from './book';
export * from './cart';
export * from './exception';
export * from './product';
export * from './local-storage';
export * from './shared';
export * from './user';
export * from './utils';
export * from './woo-commerce';

export const services = [
    ApiService,
    AuthenticationService,
    BookService,
    CartService,
    ExceptionService,
    LocalStorageService,
    ProductService,
    SharedService,
    UserService,
    UtilsService,
    WooCommerceApiService
]