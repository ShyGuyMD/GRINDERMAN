import { AuthenticationService } from '@core/services';

export const authenticationServiceMock : Partial<AuthenticationService> = {
  getLoggedInStatus: jest.fn()
};