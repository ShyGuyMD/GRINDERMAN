import { LocalStorageService } from "@core/services/local-storage";

export const localStorageServiceMock: Partial<LocalStorageService> = {
    getItem: jest.fn(),
    removeItem: jest.fn(),
    setItem: jest.fn(),
  };