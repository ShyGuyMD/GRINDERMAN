import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService, { provide: HttpClient, useValue: {} }],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpClient);
  });

  // Helper function to create mock HTTP responses
  const createMockResponse = (data: any) => {
    return of(data);
  };

  it('should do nothing', () => {
    expect(true).toBeTruthy();
  });

  describe('get', () => {
    it('should make a GET request with the provided URL, headers, and params', () => {
      const url = 'https://example.com/data';
      const headers = new HttpHeaders().set('Authorization', 'Bearer token');
      const params = new HttpParams().set('param1', 'value1');
      httpMock.get = jest
        .fn()
        .mockReturnValue(createMockResponse({ data: 'example' }));

      service.get(url, headers, params).subscribe((response) => {
        expect(httpMock.get).toHaveBeenCalledWith(url, { headers, params });
        expect(response).toEqual({ data: 'example' });
      });
    });

    it('should make a GET request with default headers and params if not provided', () => {
      const url = 'https://example.com/data';

      httpMock.get = jest
        .fn()
        .mockReturnValue(createMockResponse({ data: 'example' }));

      service.get(url).subscribe((response) => {
        expect(httpMock.get).toHaveBeenCalledWith(url, {
          headers: new HttpHeaders(),
          params: new HttpParams(),
        });
        expect(response).toEqual({ data: 'example' });
      });
    });

    it('should handle error response', () => {
      const url = 'https://example.com/data';
      const headers = new HttpHeaders().set('Authorization', 'Bearer token');
      const params = new HttpParams().set('param1', 'value1');

      httpMock.get = jest
        .fn()
        .mockReturnValue(of({ error: 'Something went wrong' }));

      service.get(url, headers, params).subscribe({
        next: () => {
          // This block should not execute in case of an error
          fail('Expected error, but received a success response.');
        },
        error: (error) => {
          expect(httpMock.get).toHaveBeenCalledWith(url, { headers, params });
          expect(error).toEqual('Something went wrong');
        },
      });
    });
  });

  describe('post', () => {
    it('should make a POST request with the provided URL, body, and headers', () => {
      const url = 'https://example.com/data';
      const body = { key: 'value' };
      const headers = new HttpHeaders().set('Authorization', 'Bearer token');
      httpMock.post = jest
        .fn()
        .mockReturnValue(createMockResponse({ status: 'success' }));

      service.post(url, body, headers).subscribe((response) => {
        expect(httpMock.post).toHaveBeenCalledWith(url, body, { headers });
        expect(response).toEqual({ status: 'success' });
      });
    });

    it('should make a POST request with default header if not provided', () => {
      const url = 'https://example.com/data';
      const body = { key: 'value' };

      httpMock.post = jest
        .fn()
        .mockReturnValue(createMockResponse({ status: 'success' }));

      service.post(url, body).subscribe((response) => {
        expect(httpMock.post).toHaveBeenCalledWith(url, body, {
          headers: new HttpHeaders(),
        });
        expect(response).toEqual({ status: 'success' });
      });
    });

    it('should handle error response', () => {
      const url = 'https://example.com/data';
      const body = { key: 'value' };
      const headers = new HttpHeaders().set('Authorization', 'Bearer token');

      httpMock.post = jest
        .fn()
        .mockReturnValue(of({ error: 'Something went wrong' }));

      service.post(url, body, headers).subscribe({
        next: () => {
          // This block should not execute in case of an error
          fail('Expected error, but received a success response.');
        },
        error: (error) => {
          expect(httpMock.post).toHaveBeenCalledWith(url, body, { headers });
          expect(error).toEqual('Something went wrong');
        },
      });
    });
  });

  describe('put', () => {
    it('should make a PUT request with the provided URL, body, and headers', () => {
      const url = 'https://example.com/data';
      const body = { key: 'updatedValue' };
      const headers = new HttpHeaders().set('Authorization', 'Bearer token');
      httpMock.put = jest
        .fn()
        .mockReturnValue(createMockResponse({ status: 'updated' }));

      service.put(url, body, headers).subscribe((response) => {
        expect(httpMock.put).toHaveBeenCalledWith(url, body, { headers });
        expect(response).toEqual({ status: 'updated' });
      });
    });

    it('should make a PUT request with default header if not provided', () => {
      const url = 'https://example.com/data';
      const body = { key: 'updatedValue' };

      httpMock.put = jest
        .fn()
        .mockReturnValue(createMockResponse({ status: 'updated' }));

      service.put(url, body).subscribe((response) => {
        expect(httpMock.put).toHaveBeenCalledWith(url, body, {
          headers: new HttpHeaders(),
        });
        expect(response).toEqual({ status: 'updated' });
      });
    });

    it('should handle error response', () => {
        const url = 'https://example.com/data';
        const body = { key: 'value' };
        const headers = new HttpHeaders().set('Authorization', 'Bearer token');
  
        httpMock.put = jest
          .fn()
          .mockReturnValue(of({ error: 'Something went wrong' }));
  
        service.put(url, body, headers).subscribe({
          next: () => {
            // This block should not execute in case of an error
            fail('Expected error, but received a success response.');
          },
          error: (error) => {
            expect(httpMock.put).toHaveBeenCalledWith(url, body, { headers });
            expect(error).toEqual('Something went wrong');
          },
        });
      });
  });
});
