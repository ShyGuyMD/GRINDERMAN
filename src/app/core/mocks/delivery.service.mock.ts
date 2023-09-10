import { DeliveryService } from "@core/services";
import { of } from "rxjs";

export const deliveryServiceMock: Partial<DeliveryService> = {
    getDeliveryArea: jest.fn().mockReturnValue(of({})),
    getDeliveryMapAddress: jest.fn().mockReturnValue(of({})),
    getDepartamentos: () => of([]),
    getIsValidDeliveryAddress: jest.fn().mockReturnValue(of({})),
    isValidDeliveryPurchase: jest.fn(),
    setDeliveryArea: jest.fn(),
    setDeliveryMapAddress: jest.fn(),
    setDepartamentos: jest.fn(),
    setIsValidDeliveryAddress: jest.fn(),

  };