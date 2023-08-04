import { WooCommerceApiService } from "@core/services";
import { of } from "rxjs";

export const wooCommerceApiServiceMock: Partial<WooCommerceApiService> = {
    getProductsById: jest.fn(),
    getProductsByKeyword: jest.fn().mockReturnValue(of({})),
    getProductAttributes: jest.fn().mockReturnValue(of([])),
    getProductAttributeTerms: jest.fn().mockReturnValue(of([])),
    postProduct: jest.fn().mockReturnValue(of({})),
    getAllProducts: jest.fn().mockReturnValue(of([])),
    postCustomer: jest.fn(),
    putProductData: jest.fn(() => of())
  };