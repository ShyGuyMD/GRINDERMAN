import { TestBed } from '@angular/core/testing';

import { BookService } from './book.service';
import { mockBook1, mockBook2, mockBook3 } from '@core/mocks/book.service.mock';
import { InventoryStatus, Severity } from '@shared/constants';
import { mockProduct } from '@core/mocks/product.service.mock';
import { Product } from '@core/models/product';
import { WooCommerceApiService } from '../woo-commerce';
import { wooCommerceApiServiceMock } from '@core/mocks/woocommerceapi.service.mock';
import { UtilsService } from '../utils';
import { utilServiceMock } from '@core/mocks/utilService.mock';

describe('BookService', () => {
  let bookService: BookService;
  let _wooCommerceApiService: WooCommerceApiService;
  let _utilService: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookService,  
        { provide: WooCommerceApiService, useValue: wooCommerceApiServiceMock },
        { provide: UtilsService, useValue: utilServiceMock },],
    });
    bookService = TestBed.inject(BookService);
    _wooCommerceApiService = TestBed.inject(WooCommerceApiService);
    _utilService = TestBed.inject(UtilsService);
  });

  describe('getSeverity', () => {
    it('should return "danger" when inventoryStatus is OUT_OF_STOCK', () => {
      const book = {
        ...mockBook3,
        inventoryStatus: InventoryStatus.OUT_OF_STOCK,
      };
      const severity = bookService.getInventorySeverity(book);
      expect(severity).toBe(Severity.DANGER);
    });

    it('should return "warn" when inventoryStatus is LIMITED_STOCK', () => {
      const book = {
        ...mockBook2,
        inventoryStatus: InventoryStatus.LIMITED_STOCK,
      };
      const severity = bookService.getInventorySeverity(book);
      expect(severity).toBe(Severity.WARNING);
    });

    it('should return "success" when inventoryStatus is IN_STOCK', () => {
      const book = { ...mockBook1, inventoryStatus: InventoryStatus.IN_STOCK };
      const severity = bookService.getInventorySeverity(book);
      expect(severity).toBe(Severity.SUCCESS);
    });
  });

  /*describe('mapProductToBook', () => {
    it('should map a product to a book object', () => {
      const book = bookService.mapProductToBook(mockProduct);

      // Assert individual properties
      expect(book.title).toBe(mockProduct.name);
      expect(book.author).toBe(mockProduct.meta_data.Author);
      expect(book.genre).toEqual(mockProduct.attributes.genre);
      expect(book.isbn).toBe(mockProduct.meta_data.ISBN);
      expect(book.price).toBe(mockProduct.regular_price);
      expect(book.publisher).toBe(mockProduct.meta_data.Publisher);
      expect(book.availableUnits).toBe(mockProduct.stock_quantity);
      expect(book.cover).toBe(mockProduct.images.cover);
      expect(book.images).toEqual(mockProduct.images.otherImages);
      expect(book.inventoryStatus).toBe(mockProduct.stock_status);
      expect(book.synopsis).toBe(mockProduct.description);
      expect(book.isNew).toBe(mockProduct.meta_data.isNew);
      expect(book.isHardcover).toBe(mockProduct.meta_data.isHardcover);
      expect(book.isActive).toBe(mockProduct.meta_data.isActive);
    });
  });*/
});
