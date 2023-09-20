import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { BookService } from '../book';
import { Option } from '@core/models/option';
import { Book_Properies, Order_Properties } from '@shared/constants';
import { OrderResponse } from '@core/models/response/orderResponse';
import { Book } from '@core/models/book';
import { OrderReportLine } from '@core/models/orderReportLine';
import { OrderService } from '../order';
import { OrderLineItem } from '@core/models/orderLineItem';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor(private _bookService: BookService, private _orderService: OrderService) {}

  readExcelFile(file: File): Observable<any[]> {
    return new Observable((observer) => {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        
        const sheetData = XLSX.utils.sheet_to_json(
          workbook.Sheets[firstSheetName],
          { defval: '' }
        ) as any[];

        // Dynamically extract headers from the first row of Excel data
        const headers = Object.keys(sheetData[0]);

        // Initialize missing properties with empty strings
        const excelData = sheetData.map((item) => {
          const updatedItem: { [key: string]: any } = {};
          headers.forEach((header) => {
            updatedItem[header] = item[header] || ''; // Use empty string for missing properties
          });
          return updatedItem;
        });

        observer.next(excelData);
        observer.complete();
      };
      reader.onerror = (error) => {
        observer.error(error);
      };
      reader.readAsBinaryString(file);
    });
  }

  public exportBooksToExcel(books: Book[]): boolean {
    try {
        const formattedBooks = this.formatBooksToExcel(books);
        const worksheet = XLSX.utils.json_to_sheet(formattedBooks);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Libros');
        XLSX.writeFile(workbook, 'libros.xlsx');
        return true;
    } catch (error) {
        return false;
    }
}


  private formatBooksToExcel(books: Book[]): any[] {
    const properties: Option[] = this._bookService.getBookPropertyOptions();
    const formattedBooks: any[] = [];

    books.forEach((book) => {
      const formattedBook: any = {};

      properties.forEach((property) => {
        if (
          !(
            property.key === Book_Properies.COVER ||
            property.key === Book_Properies.IMAGES
          )
        ) {
          if (property.key === Book_Properies.IS_ACTIVE) {
            formattedBook[property.value] = book[property.key as keyof Book]
              ? 'Activo'
              : 'Inactivo';
          } else if (property.key === Book_Properies.IS_HARDCOVER) {
            formattedBook[property.value] = book[property.key as keyof Book]
              ? 'Tapa Dura'
              : 'Tapa Blanda';
          } else if (property.key === Book_Properies.IS_NEW) {
            formattedBook[property.value] = book[property.key as keyof Book]
              ? 'Nuevo'
              : 'Usado';
          } else {
            formattedBook[property.value] = book[property.key as keyof Book];
          }
        }
      });

      formattedBooks.push(formattedBook);
    });

    return formattedBooks;
  }

  public exportOrdersToExcel(orders: OrderReportLine[]): boolean {
    try {
        const formattedOrders = this.formatOrdersToExcel(orders);
        const worksheet = XLSX.utils.json_to_sheet(formattedOrders);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Libros');
        XLSX.writeFile(workbook, 'libros.xlsx');
        return true;
    } catch (error) {
        return false;
    }
}

private formatOrdersToExcel(orders: OrderReportLine[]): any[] {
  const properties: Option[] = this._orderService.getOrderProperties();
  const formattedOrders: any[] = [];

  orders.forEach((order) => {
    const formattedOrder: any = {};

    properties.forEach((property) => {
      if (property.key === Order_Properties.ITEMS) {
        const items : OrderLineItem[] = order[property.key];
        formattedOrder[property.value] = items.map((item: any ) => item.name).join(', ');
      }
      else{
        formattedOrder[property.value] = order[property.key as keyof OrderReportLine];
      }
    });

    formattedOrders.push(formattedOrder);
  });

  return formattedOrders;
}

}
