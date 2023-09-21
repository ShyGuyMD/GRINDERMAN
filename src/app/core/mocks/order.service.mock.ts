import { OrderService } from '@core/services';
import { of } from 'rxjs';

export const orderServiceMock: Partial<OrderService> = {
  createOrder: jest.fn(),
  getOrderProperties: jest.fn(),
  mapOrderReportLine: jest.fn(),
  registerManualOrder: jest.fn(),
  retrieveOrder: jest.fn().mockReturnValue(of({})),
  retrieveAllOrders: jest.fn().mockReturnValue(of([])),
  updateOrder: jest.fn().mockReturnValue(of({}))
};
