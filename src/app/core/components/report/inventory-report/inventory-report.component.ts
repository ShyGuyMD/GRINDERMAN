import { Component, ViewChild } from '@angular/core';
import { PriceUpdateComponent } from '@core/components/price-update';
import { Book } from '@core/models/book';
import { PostBatckResponse } from '@core/models/response/postBatchRespomse';
import { ApiService, BookService } from '@core/services';
import { ExcelService } from '@core/services/excel-service/excel.service';
import { TableService } from '@core/services/inventory';
import AG_GRID_LOCALE_ES from '@shared/agGridLang';
import { Book_Properies, Severity } from '@shared/constants';
import {
  BOOK_EXPORT_INSTRUCTIONS,
  BOOK_EXPORT_INSTRUCTIONS_ORDER,
} from '@shared/texts';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ColDef,
  GridReadyEvent,
  CellClickedEvent,
  GridApi,
  ProvidedColumnGroup,
  ColumnApi,
  ColumnState,
  RowNode,
} from 'ag-grid-community';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable, of } from 'rxjs';
import { Product, isProduct } from '@core/models/product';

@Component({
  selector: 'app-inventory-report',
  templateUrl: './inventory-report.component.html',
  styleUrls: ['./inventory-report.component.css'],
})
export class InventoryReportComponent {
  public isLoading: boolean = true;
  public instructions = BOOK_EXPORT_INSTRUCTIONS;
  public instructionsOrder = BOOK_EXPORT_INSTRUCTIONS_ORDER;
  public columnDefs: ColDef[] = [];
  public defaultColDef: ColDef = {};
  public rowData$!: Observable<Book[]>;
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  private gridApi!: GridApi;
  private columnApi!: ColumnApi;
  private sortModel: ColumnState[] = [
    { colId: Book_Properies.GENRE, sort: 'asc', sortIndex: 0 },
    { colId: Book_Properies.AUTHOR, sort: 'desc', sortIndex: 1 },
    { colId: Book_Properies.TITLE, sort: 'desc', sortIndex: 2 },
  ];
  public gridOptions = {
    localeText: AG_GRID_LOCALE_ES,
    statusBar: {
      statusPanels: [
        {
          statusPanel: 'agTotalAndFilteredRowCountComponent',
          align: 'left',
        },
      ],
    },
  };

  constructor(
    private _inventoryService: TableService,
    private _bookService: BookService,
    private _excelService: ExcelService,
    private _messageService: MessageService,
    private _dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this._messageService.add({
      severity: Severity.INFO,
      summary: 'Cargando...',
      detail: 'Estamos cargando el catálogo de libros, por favor aguarda.',
    });
    this.loadInventoryData();
  }

  loadInventoryData(): void {
    this._bookService.getAllBooks().subscribe((response) => {
      this.rowData$ = of(response);
      this.isLoading = false;
    });
    this.columnDefs = this._inventoryService.getColDefsFromProperties(
      this._bookService.getBookPropertyOptions()
    );
    this.defaultColDef = this._inventoryService.getDefaultColDef();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.columnApi.applyColumnState({ state: this.sortModel });
  }

  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }
  clearFilters(): void {
    this.gridApi.setFilterModel(null);
  }
  exportFiltered(): void {
    const filteredRowData: Book[] = [];
    this.gridApi.forEachNodeAfterFilter((node) => {
      filteredRowData.push(node.data);
    });

    if (this._excelService.exportBooksToExcel(filteredRowData)) {
      this._messageService.add({
        severity: Severity.SUCCESS,
        summary: 'Éxito',
        detail: 'La exportación se completó correctamente.',
      });
    } else {
      this._messageService.add({
        severity: Severity.ERROR,
        summary: 'Error',
        detail: 'Hubo un error al exportar los libros.',
      });
    }
  }

  exportAll(): void {
    const rowData: Book[] = [];
    this.gridApi.forEachNode((node) => {
      rowData.push(node.data);
    });

    if (this._excelService.exportBooksToExcel(rowData)) {
      this._messageService.add({
        severity: Severity.SUCCESS,
        summary: 'Éxito',
        detail: 'La exportación se completó correctamente.',
      });
    } else {
      this._messageService.add({
        severity: Severity.ERROR,
        summary: 'Error',
        detail: 'Hubo un error al exportar los libros.',
      });
    }
  }

  public showPriceUpdatePopup(): void {
    const books: Book[] = [];
    this.gridApi.forEachNode((node) => {
      books.push(node.data);
    });

    const ref = this._dialogService.open(PriceUpdateComponent, {
      header: 'Actualización masiva de precios',
      data: {
        books: books,
      },
      width: '80%',
      contentStyle: { 'max-height': '80vh', overflow: 'auto' },
    });
    ref.onClose.subscribe((result: PostBatckResponse) => {
      console.log('Modal result:', result);
      const books: Book[] = [];
      result.update.forEach((item) => {
        if (isProduct(item)) {
          // Handle Product
          books.push(this._bookService.mapProductToBook(item));
        }
      });
      this.updateRows(books);
    });
  }

  private updateRows(books: Book[]) {
    this.gridApi.forEachNode((node) => {
      console.log(node);
    });
    console.log(this.gridApi);
    books.forEach((book) => {
      this.gridApi.getRowNode(book.id!.toString())!.data = book;
    });
    this.gridApi.refreshCells();
  }

  public getRowId(params : any){
    return params.data.id;
  }
}
