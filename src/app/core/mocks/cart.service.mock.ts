import { CartService } from "@core/services";

export const cartServiceMock: Partial<CartService> = {
    addToCart: jest.fn(),
  };