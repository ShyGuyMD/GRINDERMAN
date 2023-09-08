import { CartService } from "@core/services";
import { of } from "rxjs";

export const cartServiceMock: Partial<CartService> = {
    addToCart: jest.fn(),
    clearCart: jest.fn(),
    decrementQuantity: jest.fn(),
    getCart: jest.fn(),
    cartItems$: of([]),
    getTotalAmount: jest.fn(),
    getTotalQuantity: jest.fn(),
    incrementQuantity: jest.fn(),
    removeFromCart: jest.fn(),
    updateQuantity: jest.fn(),

  };