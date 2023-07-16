import { SharedService } from "@core/services";
import { of } from "rxjs";

export const sharedServiceMock : Partial<SharedService> = {
    setSearchResults: jest.fn(),
    searchResult$: of([])
  };