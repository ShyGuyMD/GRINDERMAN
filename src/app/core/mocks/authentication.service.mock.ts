import { AuthenticationService } from '@core/services';

export const authenticationServiceMock : Partial<AuthenticationService> = {
  getAuthorizationHeader: jest.fn(),
  getJwtToken: jest.fn(),
  isAuthenticated: jest.fn(),
  removeJwtToken: jest.fn(),
  setJwtToken: jest.fn(),
  login: jest.fn()
};