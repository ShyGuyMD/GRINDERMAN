import { ApiService, ProductService } from "@core/services";

export const apiServiceMock: Partial<ApiService> = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
  };
