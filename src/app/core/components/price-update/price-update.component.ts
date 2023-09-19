import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '@core/models/book';
import { PostBatckResponse } from '@core/models/response/postBatchRespomse';
import { BookService } from '@core/services';
import { TableService } from '@core/services/inventory';
import AG_GRID_LOCALE_ES from '@shared/agGridLang';
import { Book_Properies, Severity } from '@shared/constants';
import {
  PRICE_UPDATE_INSTRUCTIONS,
  PRICE_UPDATE_INSTRUCTIONS_ORDER,
} from '@shared/texts';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ColDef,
  ColumnApi,
  ColumnState,
  GridApi,
  GridReadyEvent,
} from 'ag-grid-community';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-price-update',
  templateUrl: './price-update.component.html',
  styleUrls: ['./price-update.component.css'],
})
export class PriceUpdateComponent {
  public priceUpdateForm!: FormGroup;
  public isLoading: boolean = true;
  public instructions = PRICE_UPDATE_INSTRUCTIONS;
  public instructionsOrder = PRICE_UPDATE_INSTRUCTIONS_ORDER;
  public columnDefs: ColDef[] = [];
  public defaultColDef: ColDef = {};
  public rowData$!: Observable<Book[]>;
  private originalPrices: { [key: number]: number } = {};
  

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  private gridApi!: GridApi;
  private columnApi!: ColumnApi;
  private sortModel : ColumnState[] = [
    { colId: Book_Properies.GENRE, sort: 'asc', sortIndex: 0 },
    { colId: Book_Properies.AUTHOR, sort: 'desc', sortIndex: 1 },
    { colId: Book_Properies.TITLE, sort: 'desc', sortIndex: 2 },
  ];
  public gridOptions = {
    localeText: AG_GRID_LOCALE_ES,
  };
  @Output() updatedBooks: EventEmitter<void> = new EventEmitter();

  constructor(
    private _inventoryService: TableService,
    private _bookService: BookService,
    private _messageService: MessageService,
    private _config: DynamicDialogConfig,
    private _ref: DynamicDialogRef,
    private _formBuilder: FormBuilder,
    private _confirmationService: ConfirmationService,
  ) {
    if (_config.data) {
      const books: Book[] = _config.data.books;
      if (books !== undefined) {
        books.forEach((book: Book) => {
          this.originalPrices[book.id!] = book.price;
        });
        this.rowData$ = of(books);
      } else {
        this.rowData$ = of([]);
      }
    }
  }

  ngOnInit(): void {
    this.initTable();
    this.initForm();
  }

  private initForm(): void {
    this.priceUpdateForm = this._formBuilder.group({
      value: ['', [Validators.required]],
    });
    this.priceUpdateForm.valueChanges.subscribe(() => {
      const data = this.priceUpdateForm.value;
      this.updatePrices(data.value);
    });
  }

  initTable(): void {
    this.columnDefs = this._inventoryService.getColDefsFromProperties(
      this._bookService.getBookPropertyOptions()
    );
    this.defaultColDef = this._inventoryService.getDefaultColDef();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.columnApi.applyColumnState({ state: this.sortModel})
    this.columnApi.setColumnPinned(Book_Properies.PRICE, 'left');
    this.isLoading = false;
  }

  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
  clearFilters(): void {
    this.gridApi.setFilterModel(null);
  }

  public updatePrices(percentage: number): void {
    const decimalPercentage = percentage / 100;

    this.gridApi.forEachNodeAfterFilter(node => {
        node.data.price = Math.round(this.originalPrices[node.data.id] + (this.originalPrices[node.data.id] * decimalPercentage));
    });

    this.gridApi.refreshCells();
}

  public apply(): void {
    const books: Book[] = []
    this.gridApi.forEachNodeAfterFilter(node => {
      books.push(node.data);
  });
    this.isLoading = true;
    let result : PostBatckResponse ;
    this._bookService.postBatchOfBooks(books).subscribe({
      next: (v) => {
        this._messageService.add({
          severity: Severity.SUCCESS,
          summary: '¡Éxito!',
          detail: 'Los precios han sido actualizados.',
        });
        result = v;
      },
      error: (e) => {
        this._messageService.add({
          severity: Severity.ERROR,
          summary: '¡Upss!',
          detail: 'Lo sentimos, hubo un error procesando la actualización de precios.',
        });
      },
      complete: () => this._ref.close(result),
    })
  }

  confirmPopup() {
    if (this.priceUpdateForm.valid) {
      this._confirmationService.confirm({
        message:
        `¿Estás seguro de continuar? Se aplicará una actualización de precio del ${this.priceUpdateForm.value.value}% en los libros filtrados.`,
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this._messageService.add({
            severity: Severity.INFO,
            summary: 'Procesando',
            detail: 'Tus cambios están siendo procesados, por favor aguarda.',
          });
          this.apply();
          this.priceUpdateForm.disable();
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
}
