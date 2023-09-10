import { SharedService } from "@core/services";
import { of } from "rxjs";

export const sharedServiceMock : Partial<SharedService> = {
    setSearchResults: jest.fn(),
    searchResult$: of([]),
    getKeyword: jest.fn().mockReturnValue(of({})),
    getSearchResults: jest.fn(),
    setKeyword: jest.fn(),
  };