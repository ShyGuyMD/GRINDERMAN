import { InventoryService } from "@core/services/inventory";

export const inventoryServiceMock: Partial<InventoryService> = {
    getColDefsFromProperties: jest.fn(),
    getDefaultColDef: jest.fn()

  };
