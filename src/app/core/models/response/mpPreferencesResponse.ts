import { MercadoPagoCallbacks, MercadoPagoItem, MercadoPagoPayerInfo } from "../request/mpPreferencesRequest";

export interface MPPreferencesResponse {
    id : string,
    date_created : string,
    init_point : string,
    sandbox_init_point : string, // TODO borrar. Se usa para pruebas.
    statement_descriptor : string,
    auto_return : string,
    back_urls : MercadoPagoCallbacks,
    items : MercadoPagoItem[],
    payer : MercadoPagoPayerInfo
}