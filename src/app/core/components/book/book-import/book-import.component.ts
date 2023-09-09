import { Component, ViewChild } from '@angular/core';
import { Book } from '@core/models/book';
import { Option } from '@core/models/option';
import { BookService } from '@core/services';
import { ExcelService } from '@core/services/excel-service/excel.service';
import { BOOK_IMPORT_INSTRUCTIONS, BOOK_IMPORT_INSTRUCTIONS_ORDER } from '@shared/texts';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-book-import',
  templateUrl: './book-import.component.html',
  styleUrls: ['./book-import.component.css'],
})
export class BookImportComponent {
  public instructions = BOOK_IMPORT_INSTRUCTIONS;
  public instructionsOrder = BOOK_IMPORT_INSTRUCTIONS_ORDER;
  excelHeaders: string[] = []; // Store Excel headers
  bookProperties: Option[] = []; // Your book properties
  mappedHeaders: Record<string, string> = {}; // Stores the column mapping
  private excelData: any[] = []; // Stores Excel data
  public loadedExcel: boolean = false;
  public blankValue: string = 'Selecciona un encabezado';
  @ViewChild('fileUpload') fileUpload!: FileUpload;

  constructor(
    private _importService: ExcelService,
    private _bookService: BookService,
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.bookProperties = this._bookService.getBookPropertyOptions();
  }
  public onFileChange(event: any): void {
    console.log('onFileChange', event.currentFiles);
    const file = event.currentFiles[0];
    if (file) {
      this._importService.readExcelFile(file).subscribe((data: any[]) => {
        console.log('data', data);
        this.excelData = data;
        this.loadedExcel = true;
        if (Object.keys(this.mappedHeaders).length === 0) {
          this.excelHeaders = Object.keys(data[0]);
          this.excelHeaders.unshift('');
        }
      });
    }
  }

  confirmPopup() {
    this._confirmationService.confirm({
      message: '¿Estás seguro de continuar? Ten en cuenta que cualquier cambio realizado en libros existentes sobreescribirá todos los campos. Por favor, confirma si deseas proceder.',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._messageService.add({
          severity: 'info',
          summary: 'Confirmación',
          detail: 'Tus cambios están siendo procesados, por favor aguarda.',
        });
      },
      reject: () => {
        this._messageService.add({
          severity: 'warn',
          summary: 'Advertencia',
          detail: 'No se han confirmado los cambios.',
        });
      },
    });
  }

  confirmMapping(): void {
    console.log('User-defined Mapping:', this.mappedHeaders);
    this.mapHeaders(this.mappedHeaders);
    const books = this.mapRows();
    this.postBatchOfBooks(books);
    console.log('excelData', this.excelData);
  }

  cancel(): void {
    this.loadedExcel = false;
    this.fileUpload.clear();
    this.clearMapping();
  }

  clearMapping(): void {
    this.excelHeaders = []; // Store Excel headers
    this.mappedHeaders = {}; // Stores the column mapping
    this.excelData = []; // Stores Excel data
  }

  mapHeaders(userMappings: Record<string, string>): void {
    this.mappedHeaders = userMappings;
  }

  public mapRows(): Book[] {
    const books: Book[] = [];

    this.excelData.forEach((row) => {
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
      next: (responses) => {
        // Handle responses here
        console.log('Batch responses:', responses);
      },
      error: (error) => {
        console.log('Error posting batches:', error);
      },
      complete: () => {
        console.log('All batches completed.');
      },
    });
  }
}
