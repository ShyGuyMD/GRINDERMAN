import { AuthenticationService } from '@core/services';

export const authenticationServiceMock : Partial<AuthenticationService> = {
  isAuthenticatedUser: jest.fn()
};