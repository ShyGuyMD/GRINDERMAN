import { NavigationService } from "@core/services";

export const navigationServiceMock: Partial<NavigationService> = {
    navigateTo: jest.fn(),
  };