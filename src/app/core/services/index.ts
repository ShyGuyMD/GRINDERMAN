import { ApiService } from './api';
import { AuthenticationService } from './authentication';
import { BookService } from './book';
import { ExceptionService } from './exception';
import { ProductService } from './product';
import { SharedService } from './shared';
import { UserService } from './user';
import { UtilsService } from './utils';
import { WooCommerceApiService } from './woo-commerce';

export * from './api';
export * from './authentication';
export * from './book';
export * from './exception';
export * from './product';
export * from './shared';
export * from './user';
export * from './utils';
export * from './woo-commerce';

export const components = [
    ApiService,
    AuthenticationService,
    BookService,
    ExceptionService,
    ProductService,
    SharedService,
    UserService,
    UtilsService,
    WooCommerceApiService
]