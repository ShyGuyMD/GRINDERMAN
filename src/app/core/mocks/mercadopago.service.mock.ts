import { MercadopagoService } from '@core/services/mercadopago/mercadopago.service';
import { of } from 'rxjs';

export const mercadopagoServiceMock: Partial<MercadopagoService> = {
    checkout: jest.fn().mockReturnValue(of({}))
};
