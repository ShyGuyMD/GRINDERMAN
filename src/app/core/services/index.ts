import { ApiService } from './api';
import { AuthenticationService } from './authentication';
import { BookService } from './book';
import { CartService } from './cart';
import { CoCartApiService } from './co-cart-api';
import { ExceptionService } from './exception';
import { OrderService } from './order';
import { ProductService } from './product';
import { SharedService } from './shared';
import { UserService } from './user';
import { UtilsService } from './utils';
import { WooCommerceApiService } from './woo-commerce';

export * from './api';
export * from './authentication';
export * from './book';
export * from './cart';
export * from './co-cart-api';
export * from './exception';
export * from './order';
export * from './product';
export * from './shared';
export * from './user';
export * from './utils';
export * from './woo-commerce';

export const services = [
    ApiService,
    AuthenticationService,
    BookService,
    CartService,
    CoCartApiService,
    ExceptionService,
    OrderService,
    ProductService,
    SharedService,
    UserService,
    UtilsService,
    WooCommerceApiService
]