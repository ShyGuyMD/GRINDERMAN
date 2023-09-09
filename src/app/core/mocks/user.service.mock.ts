import { UserService } from "@core/services";

export const userServiceMock: Partial<UserService> = {
    getUserData: jest.fn(),
    getUserName: jest.fn(),
    registerAdministrator: jest.fn(),
    registerClient: jest.fn(),
    setUserData: jest.fn(),
    getActiveUser: jest.fn(),
    isAdminUser: jest.fn(),
    isUserLoggedIn: jest.fn(),
    mapCreateAdminRequest: jest.fn(),
    mapCreateClientRequest: jest.fn(),
    mapUserData: jest.fn(),

  };