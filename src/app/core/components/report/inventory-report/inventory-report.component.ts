import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Book } from '@core/models/book';
import { Genre } from '@core/models/genre';
import { ApiService, BookService } from '@core/services';
import { ExcelService } from '@core/services/excel-service/excel.service';
import { InventoryService } from '@core/services/inventory';
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
} from 'ag-grid-community';
import { MessageService } from 'primeng/api';
import { Observable, of } from 'rxjs';

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
  public gridOptions = {
    localeText: AG_GRID_LOCALE_ES,
    defaultSortModel: [
      { colId: Book_Properies.GENRE, sort: 'asc' },
      { colId: Book_Properies.AUTHOR, sort: 'desc' },
      { colId: Book_Properies.TITLE, sort: 'desc' },
    ],
  };

  constructor(
    private _inventoryService: InventoryService,
    private _bookService: BookService,
    private _excelService: ExcelService,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._messageService.add({
      severity: Severity.INFO,
      summary: 'Cargando...',
      detail: 'Escamos cargando el catálogo de libros, por favor aguarda.',
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
}
