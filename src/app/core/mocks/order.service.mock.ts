import { OrderService } from "@core/services";

export const orderServiceMock: Partial<OrderService> = {
    createOrder: jest.fn(),
    mapOrderRequest: jest.fn(),
    retrieveAllOrders: jest.fn(),
    retrieveOrder: jest.fn(),
  };
