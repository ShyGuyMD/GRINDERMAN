import { UtilsService } from "@core/services";

export const utilServiceMock: Partial<UtilsService> = {
    sanitizeAndRemoveHtmlTags: jest.fn(),
    cloneObject: jest.fn(),
  };