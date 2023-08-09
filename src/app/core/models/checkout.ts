export const STEP_CART = '/checkout/cart';
export const STEP_DELIVERY = '/checkout/delivery-options';
export const STEP_PAYMENT = '/checkout/payment';
export const STEP_ADMIN_CART = '/admin/checkout/cart';
export const STEP_ADMIN_SUMMARY = '/admin/checkout/order-summary';

export const CHECKOUT_ROUTEMAPPINGS: { [key: string]: number } = {
  [STEP_CART]: 0,
  [STEP_DELIVERY]: 1,
  [STEP_PAYMENT]: 2,
};

export const CHECKOUT_ADMIN_ROUTEMAPPINGS: { [key: string]: number } = {
  [STEP_ADMIN_CART]: 0,
  [STEP_ADMIN_SUMMARY]: 1,
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
