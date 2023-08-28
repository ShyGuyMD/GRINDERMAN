import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { WooCommerceApiService } from '../woo-commerce';
import { BookService } from '../book';
import { Book } from '@core/models/book';
import { Option } from '@core/models/option';
import { Book_Properies } from '@shared/constants';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor(
    private _wooCommerceApiService: WooCommerceApiService,
    private _bookService: BookService
  ) {}

  readExcelFile(file: File): Observable<any[]> {
    return new Observable((observer) => {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        console.log('sheet name', workbook, firstSheetName);
        const excelData = XLSX.utils.sheet_to_json(
          workbook.Sheets[firstSheetName]
        );

        observer.next(excelData);
        observer.complete();
      };
      reader.onerror = (error) => {
        observer.error(error);
      };
      reader.readAsBinaryString(file);
    });
  }

  public exportBooksToExcel(books: Book[]): void {
    const formattedBooks = this.formatBooksToExcel(books);
    const worksheet = XLSX.utils.json_to_sheet(formattedBooks);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Libros');
    XLSX.writeFile(workbook, 'libros.xlsx');
  }

  private formatBooksToExcel(books:Book[]): any[]{
    const properties: Option[] = this._bookService.getBookPropertyOptions();
    const formattedBooks: any[] = [];
  
    books.forEach(book => {
      const formattedBook : any = {};
      
      properties.forEach(property => {
        if(!(property.key === Book_Properies.COVER || property.key === Book_Properies.IMAGES))
        {
          if(property.key === Book_Properies.IS_ACTIVE){
            formattedBook[property.value] = book[property.key as keyof Book] ? 'Activo' : 'Inactivo'
          }else if (property.key === Book_Properies.IS_HARDCOVER){
            formattedBook[property.value] = book[property.key as keyof Book] ? 'Tapa dura' : 'Tapa Blanda'
          }else if (property.key === Book_Properies.IS_NEW){
            formattedBook[property.value] = book[property.key as keyof Book] ? 'Nuevo' : 'Usado'
          }else{
            formattedBook[property.value] = book[property.key as keyof Book];
          }
        }
      });
  
      formattedBooks.push(formattedBook);
    });
  
    return formattedBooks;
  }
}
