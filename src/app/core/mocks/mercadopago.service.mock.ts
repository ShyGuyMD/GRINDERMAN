import { MercadopagoService } from '@core/services';
import { of } from 'rxjs';

export const mercadopagoServiceMock: Partial<MercadopagoService> = {
    checkout: jest.fn().mockReturnValue(of({}))
};
