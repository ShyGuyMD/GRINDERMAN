export interface Address {
    first_name : string;
    last_name : string;
    company? : string;
    address_1 : string;
    address_2? : string;
    city : string;
    state : string;
    postcode : string;
    country : string;
    phone : string;
}

export interface BillingAddress extends Address {
    email : string;
}

export interface ShippingAddress extends Address {}