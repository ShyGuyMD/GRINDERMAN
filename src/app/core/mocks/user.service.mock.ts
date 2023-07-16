import { UserService } from "@core/services";

export const userServiceMock: Partial<UserService> = {
    getUserData: jest.fn(),
    getUserName: jest.fn(),
    registerAdministrator: jest.fn(),
    registerClient: jest.fn(),
    setUserData: jest.fn(),
    validatePassword: jest.fn(),
    valitdateEmail: jest.fn()
  };