export interface MPPreferencesRequest {
    items : MercadoPagoItem[],
    payer : MercadoPagoPayerInfo,
    auto_return : string,
    back_urls : MercadoPagoCallbacks,
    external_reference: string
}

export interface MercadoPagoItem {
    id : string,
    title: string,
    quantity: number,
    unit_price: number
}

export interface MercadoPagoCallbacks {
    success : string,
    pending : string,
    failure : string
}

export interface MercadoPagoPayerInfo {
    name : string,
    surname : string,
    email : string,
    phone? : {
        area_code: string,
        number : number
    }
}