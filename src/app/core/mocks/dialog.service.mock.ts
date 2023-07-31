import { DialogService } from "primeng/dynamicdialog";

export const dialogServiceMock: Partial<DialogService> = {
    open: jest.fn()
  };