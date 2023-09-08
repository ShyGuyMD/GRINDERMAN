import { TestBed } from '@angular/core/testing';

import { WooCommerceApiService } from './woo-commerce-api.service';
import { ApiService } from '../api';
import { ProductService } from '../product';
import { apiServiceMock } from '@core/mocks/api.service.mock';
import { mockProduct, productServiceMock } from '@core/mocks/product.service.mock';
import { HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { CreateProductRequest } from '@core/models/request/createProductRequest';
import { CreateCustomerRequest } from '@core/models/request/createCustomerRequest';
import { UserRole } from '@shared/constants';
import { mockBook1 } from '@core/mocks/book.service.mock';
import { Book } from '@core/models/book';
import { AuthenticationService } from '../authentication';
import { authenticationServiceMock } from '@core/mocks/authentication.service.mock';

describe('WooCommerceApiService', () => {
    let service: WooCommerceApiService;
    let _apiService: ApiService;
    let _productService: ProductService;
    let _authService: AuthenticationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: ApiService, useValue: apiServiceMock },
                { provide: ProductService, useValue: productServiceMock },
                { provide: AuthenticationService, useValue: authenticationServiceMock },
              ],
        });
      });
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(WooCommerceApiService);
        _apiService = TestBed.inject(ApiService);
        _productService = TestBed.inject(ProductService);
        _authService = TestBed.inject(AuthenticationService);

        service['baseUrl'] = 'https://example.com';
    })

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

   /* describe('getAllProducts', () => {
        it('should call the get method of ApiService with correct data', () => {
          (<jest.Mock>_apiService.get).mockReturnValue(of({}));
          
    
          service.getAllProducts().subscribe();

          const url = 'https://example.com/products/';
          expect(_apiService.get).toHaveBeenCalledWith( 
            url,
            expect.anything()
          )
        });
      });
    
     describe('getProductsById', () => {
        it('should call the get method of ApiService with correct data', () => {
          const productId = 123;
          (<jest.Mock>_apiService.get).mockReturnValue(of({}));
    
          service.getProductsById(productId).subscribe();
    
          const url = `https://example.com/products/${productId}`;
          expect(_apiService.get).toHaveBeenCalledWith( 
            url,
            expect.anything()
          )
        });
      });
    
     describe('getProductsByKeyword', () => {
        it('should call the get method of ApiService with correct data', () => {
          const keyword = 'book';
          (<jest.Mock>_apiService.get).mockReturnValue(of({}));
    
          service.getProductsByKeyword(keyword).subscribe();

          const url = `https://example.com/products?search=${keyword}`;
          expect(apiServiceMock.get).toHaveBeenCalledWith(
            url,
            expect.anything()
          )
        });
      });
     
      describe('getProductAttributes', () => {
        it('should call the get method of ApiService with correct data', () => {
          const url = `https://example.com/products/attributes`;
          (<jest.Mock>_apiService.get).mockReturnValue(of({}));
    
          service.getProductAttributes().subscribe();

          expect(_apiService.get).toHaveBeenCalledWith(
            url,
            expect.anything()
          )
        });
      });
    
      describe('getProductAttributeTerms', () => {
        it('should call the get method of ApiService with correct data', () => {
          const attrId = 456;
          const url = `https://example.com/products/attributes/${attrId}/terms`;
          (<jest.Mock>_apiService.get).mockReturnValue(of({}));
    
          service.getProductAttributeTerms(attrId).subscribe();
    
          // Assert
          expect(_apiService.get).toHaveBeenCalledWith(
            url,
            expect.anything()
          );
        });
      });
    
      describe('postProduct', () => {
        it('should call the post method of ApiService with correct data', () => {
          const book: Book = mockBook1;
          const url = `https://example.com/products`;
          (<jest.Mock>_apiService.post).mockReturnValue(of({}));
          (<jest.Mock>_productService.mapBookToProduct).mockReturnValue(mockProduct);
    
          service.postProduct(book).subscribe();
    
          expect(_productService.mapBookToProduct).toHaveBeenCalledWith(book);
          expect(_apiService.post).toHaveBeenCalledWith(url, mockProduct, expect.anything());
        });
      });
    
      describe('postProductAttributeTerms', () => {
        it('should call the post method of ApiService with correct data', () => {
          const productId = 789;
          const termValue = 'Large';
          const url = `https://example.com/products/attributes/${productId}/terms`;
          (<jest.Mock>_apiService.post).mockReturnValue(of({}));
    
          service.postProductAttributeTerms(productId, termValue).subscribe();
    
          const bodyRequest = { name: termValue };
          expect(_apiService.post).toHaveBeenCalledWith(url, bodyRequest, expect.anything());
        });
      });
    
      describe('putProductData', () => {
        it('should call the put method of ApiService with correct data', () => {
          const productId = 987;
          const body = { title: 'Updated Book', price: 39.99 };
          const url = `https://example.com/products/${productId}`;
          (<jest.Mock>_apiService.put).mockReturnValue(of({}));
    
          service.putProductData(productId, body).subscribe();
    
          expect(_apiService.put).toHaveBeenCalledWith(url, body, expect.anything());
        });
      });
    
      describe('postCustomer', () => {
        it('should call the post method of ApiService with correct data', () => {
          const body: CreateCustomerRequest = { email: 'test@example.com', password: 'password', role: UserRole.CLIENT };
          const url = `https://example.com/customers`;
          (<jest.Mock>_apiService.post).mockReturnValue(of({}));

          service.postCustomer(body).subscribe();

          expect(_apiService.post).toHaveBeenCalledWith(url, body, expect.anything());
        });
      });
      */
});
