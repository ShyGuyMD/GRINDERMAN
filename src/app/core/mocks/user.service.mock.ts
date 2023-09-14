import { UserService } from "@core/services";
import { of } from "rxjs";

export const userServiceMock: Partial<UserService> = {
    getActiveUserData: jest.fn(),
    setActiveUser: jest.fn(),
    getActiveUser: jest.fn().mockReturnValue(of({})),
    getUserName: jest.fn(),
    registerAdministrator: jest.fn(),
    registerClient: jest.fn(),
    isAdminUser: jest.fn(),
    isUserLoggedIn: jest.fn(),
    mapCreateAdminRequest: jest.fn(),
    mapCreateClientRequest: jest.fn(),
    mapUserData: jest.fn(),

  };