import { ApiService } from "@core/services";
import { of } from "rxjs";

export const apiServiceMock: Partial<ApiService> = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    jsonp: jest.fn().mockReturnValue(of([])),
    loadCSVData: jest.fn().mockReturnValue(of([])),
  };
