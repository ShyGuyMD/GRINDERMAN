import { Subject } from "rxjs";

export const routerMock = {
    navigate: jest.fn(),
    events: new Subject(),
  };