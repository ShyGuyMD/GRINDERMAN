import { CoCartApiService } from "@core/services";

export const coCartApiServiceMock: Partial<CoCartApiService> = {
    login: jest.fn()
  };