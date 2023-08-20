export interface MPPreferencesRequest {
    items : MercadoPagoItem[],
    auto_return : string,
    back_urls : MercadoPagoCallbacks
}

export interface MercadoPagoItem {

}

export interface MercadoPagoCallbacks {
    success : string,
    pending : string,
    failure : string
}