export enum InventoryStatus {
    IN_STOCK = 'Disponible',
    OUT_OF_STOCK = 'Sin Stock',
    LIMITED_STOCK = 'Stock Limitado',
}

export enum Attributes {
    ATTR_GENRE = 'Genero'
}

export enum UserRole {
    ADMIN = 'administrator',
    CLIENT = 'customer'
}

export enum WoocommerceError {
    EMAIL_EXISTS = 'registration-error-email-exists'
}

export enum Severity {
    DANGER = 'danger',
    WARNING = 'warn',
    SUCCESS = 'success'
}

export const MIN_DELIVERY = 700;

//#region URL
export const HOME = 'home';
export const BLANK_PAGE = 'blank';
export const CATALOGUE = 'catalogue';
export const LOGIN = 'login';
export const BOOK_CREATE = 'book-create';
export const BOOK_DETAIL = 'book-detail/:id';
export const BOOK_EDIT ='book-edit';
export const CLIENT_CREATE = 'register';
export const ADMIN_CREATE = 'admin-create';
export const CHECKOUT = 'checkout';
export const CART = 'cart';
export const DELIVERY = 'delivery-options';
export const PAYMENT = 'payment';
export const ORDER_SUMMARY = 'order-summary';

//#endregion

//#region Checkout
export const CHECKOUT_CART = '/checkout/cart';
export const CHECKOUT_DELIVERY = '/checkout/delivery-options';
export const CHECKOUT_PAYMENT = '/checkout/payment';
export const CHECKOUT_ORDER_SUMMARY = '/checkout/order-summary';

export const CHECKOUT_ROUTEMAPPINGS: { [key: string]: number } = {
  [CHECKOUT_CART]: 0,
  [CHECKOUT_DELIVERY]: 1,
  [CHECKOUT_PAYMENT]: 2,
};

export const CHECKOUT_ADMIN_ROUTEMAPPINGS: { [key: string]: number } = {
  [`/admin${CHECKOUT_CART}`]: 0,
  [`/admin${CHECKOUT_ORDER_SUMMARY}`]: 1,
};

export const CHECKOUT_STEPS = [
  { label: 'Mi Carrito' },
  { label: 'Envio' },
  { label: 'Pago' },
];

export const CHECKOUT_ADMIN_STEPS = [
  { label: 'Carrito de Compras' },
  { label: 'Resumen de Compra' },
];


//#endregion