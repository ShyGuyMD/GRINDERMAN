import { Component } from '@angular/core';
import { Book } from '@core/models/book';
import { Option } from '@core/models/option';
import { BookService } from '@core/services';
import { ExcelService } from '@core/services/excel-service/excel.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-book-import',
  templateUrl: './book-import.component.html',
  styleUrls: ['./book-import.component.css'],
})
export class BookImportComponent {
  excelHeaders: string[] = []; // Store Excel headers
  bookProperties: Option[] = []; // Your book properties
  mappedHeaders: Record<string, string> = {}; // Stores the column mapping
  private excelData: any[] = []; // Stores Excel data
  public loadedExcel: boolean = false;
  public blankValue: string = 'Selecciona un encabezado';

  constructor(
    private _importService: ExcelService,
    private _bookService: BookService
  ) {}

  ngOnInit(): void {
    this.bookProperties = this._bookService
      .getBookPropertyOptions();
  }
  public onFileChange(event: any): void {
    console.log("onFileChange", event.currentFiles)
    const file = event.currentFiles[0];
    if (file) {
      this._importService.readExcelFile(file).subscribe((data: any[]) => {
        console.log("data", data);
        this.excelData = data;
        this.loadedExcel = true;
        if (Object.keys(this.mappedHeaders).length === 0) {
          this.excelHeaders = Object.keys(data[0]);
          this.excelHeaders.unshift('');
        }
      });
    }
  }

  confirmMapping(): void {
    console.log('User-defined Mapping:', this.mappedHeaders);
    this.mapHeaders(this.mappedHeaders);
    const books = this.mapRows();
    this.postBatchOfBooks(books)
    console.log("excelData", this.excelData)
  }

  mapHeaders(userMappings: Record<string, string>): void {
    this.mappedHeaders = userMappings;
  }

  public mapRows(): Book[]{
    const books: Book[] = [];

    this.excelData.forEach(row => {
      const mappedRow: any = {};
      for (const excelHeader in this.mappedHeaders) {
        if (this.mappedHeaders.hasOwnProperty(excelHeader)) {
          const appPropertyName = this.mappedHeaders[excelHeader];
          if (excelHeader !== '') {
            mappedRow[excelHeader] = row[appPropertyName];
          } 
        }
      }
      const book: Book = this._bookService.createBook(mappedRow);
      books.push(book);
    });

    return books;
  }

  private postBatchOfBooks(books: Book[]): void {
    const batchSize = 10; // Number of books to post in each batch
    const delay = 500; // Delay in milliseconds

  this._bookService.postBooksInBatches(books, batchSize, delay).subscribe({
    next: responses => {
      // Handle responses here
      console.log('Batch responses:', responses);
    },
    error: error => {
      console.log('Error posting batches:', error);
    },
    complete: () => {
      console.log('All batches completed.');
    }
  });
  }
}
