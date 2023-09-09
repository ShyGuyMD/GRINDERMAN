import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '@core/models/book';
import { BookPropertyOption, Option } from '@core/models/option';
import { PostBatckResponse } from '@core/models/response/postBatchRespomse';
import { BookService } from '@core/services';
import { ExcelService } from '@core/services/excel-service/excel.service';
import { Severity } from '@shared/constants';
import {
  BOOK_IMPORT_INSTRUCTIONS,
  BOOK_IMPORT_INSTRUCTIONS_ORDER,
} from '@shared/texts';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { FileUpload } from 'primeng/fileupload';
import { ResultDisplayComponent } from './result-display';

@Component({
  selector: 'app-book-import',
  templateUrl: './book-import.component.html',
  styleUrls: ['./book-import.component.css'],
})
export class BookImportComponent {
  public instructions = BOOK_IMPORT_INSTRUCTIONS;
  public instructionsOrder = BOOK_IMPORT_INSTRUCTIONS_ORDER;

  public bookProperties: BookPropertyOption[] = [];
  public blankValue: string = 'Selecciona un encabezado';
  public importForm!: FormGroup;

  public loadedExcel: boolean = false;
  private excelData: any[] = [];
  public excelHeaders: string[] = [];
  private mappedHeaders: Record<string, string> = {};
  private errorMessages: string[] = [];
  
  @ViewChild('fileUpload') fileUpload!: FileUpload;

  constructor(
    private _importService: ExcelService,
    private _bookService: BookService,
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService,
    private _formBuilder: FormBuilder,
    private _dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.bookProperties = this._bookService.getBookPropertyOptions();
    this.initForm(this.bookProperties);
  }

  private initForm(bookProperties: BookPropertyOption[]): void {
    const formControls: Record<string, any> = {};

    bookProperties.forEach((property) => {
      formControls[property.key] = [
        null,
        property.required ? Validators.required : null,
      ];
    });

    this.importForm = this._formBuilder.group(formControls);

    Object.keys(formControls).forEach((key) => {
      this.importForm.get(key)?.valueChanges.subscribe((value) => {
        this.mappedHeaders[key] = value;
      });
    });
  }

  public onFileChange(event: any): void {
    const file = event.currentFiles[0];
    if (file) {
      this._importService.readExcelFile(file).subscribe((data: any[]) => {
        this.excelData = data;
        this.loadedExcel = true;
        if (Object.keys(this.mappedHeaders).length === 0) {
          this.excelHeaders = Object.keys(data[0]);
          this.excelHeaders.unshift('');
        }
        this.excelHeaders.forEach((header) => {
          const propertyOption = this.bookProperties.find(
            (p) => p.value === header
          );
          const mappedHeaderKey = propertyOption ? propertyOption.key : '';
          this.importForm.get(mappedHeaderKey)?.setValue(header);
        });
      });
    }
  }

  confirmPopup() {
    if (this.importForm.valid) {
      this._confirmationService.confirm({
        message:
          '¿Estás seguro de continuar? Ten en cuenta que cualquier cambio realizado en libros existentes sobreescribirá todos los campos. Por favor, confirma si deseas proceder.',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this._messageService.add({
            severity: Severity.INFO,
            summary: 'Procesando',
            detail: 'Tus cambios están siendo procesados, por favor aguarda.',
          });
          this.confirmMapping();
        },
        reject: () => {
          this._messageService.add({
            severity: Severity.WARNING,
            summary: 'Advertencia',
            detail: 'No se han confirmado los cambios.',
          });
        },
      });
    }
  }

  confirmMapping(): void {
    this.mapHeaders(this.mappedHeaders);
    const books = this.mapRows();
    this.postBatchOfBooks(books);
  }

  cancel(): void {
    this.loadedExcel = false;
    this.fileUpload.clear();
    this.errorMessages = [];
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
    const batchSize = 90; // Number of books to post in each batch
    const delay = 500; // Delay in milliseconds

    this._bookService.postBooksInBatches(books, batchSize, delay).subscribe({
      next: (responses: PostBatckResponse) => {
        if (responses.update) {
          responses.update.forEach((item) => {
            if ('error' in item) {
              const errorMessage = `Error en la actualiación del item ID ${item.id}: ${item.error.message}`;
              this.errorMessages.push(errorMessage);
            }
          });
        }
        if (responses.create) {
          responses.create.forEach((item) => {
            if ('error' in item) {
              const errorMessage = `Error Error de creación: ${item.error.message}`;
              this.errorMessages.push(errorMessage);
            }
          });
        }
      },
      error: (error) => {
        this._messageService.add({
          severity: Severity.ERROR,
          summary: 'Error',
          detail: `Error en la importación de archivo. ${error}`,
        });
      },
      complete: () => {
        this.showResultPopup();
        this.cancel();
      },
    });
  }

  private showResultPopup() {
    const ref = this._dialogService.open(ResultDisplayComponent, {
      header:
        this.errorMessages.length > 0
          ? 'Importación completada con errores'
          : 'Importación exitosa',
      data: {
        errorDescription:
          'Los siguientes registros no fueron correctamente importados al catálogo: ',
        errorMessages: this.errorMessages,
        successDescription: 'La importación ha sido completada sin errores.',
      },
      width: '70%',
      contentStyle: { 'max-height': '400px', overflow: 'auto' },
    });
  }
}
