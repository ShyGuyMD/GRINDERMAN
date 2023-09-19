import { TableService } from "@core/services/inventory";

export const inventoryServiceMock: Partial<TableService> = {
    getColDefsFromProperties: jest.fn(),
    getDefaultColDef: jest.fn()

  };
