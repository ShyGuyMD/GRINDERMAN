import { ProductService } from "@core/services";

export const productServiceMock: Partial<ProductService> = {
    mapBookToProduct: jest.fn()
  };
