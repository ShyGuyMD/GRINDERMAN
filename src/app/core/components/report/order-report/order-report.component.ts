import { Component, ViewChild } from '@angular/core';
import { OrderReportLine } from '@core/models/orderReportLine';
import { OrderService } from '@core/services';
import { ExcelService } from '@core/services/excel-service/excel.service';
import { TableService } from '@core/services/inventory';
import AG_GRID_LOCALE_ES from '@shared/agGridLang';
import { Severity } from '@shared/constants';
import {
  ORDER_REPORT_INSTRUCTIONS,
  ORDER_REPORT_INSTRUCTIONS_ORDER,
} from '@shared/texts';
import { AgGridAngular } from 'ag-grid-angular';
import {
  CellClickedEvent,
  ColDef,
  ColumnApi,
  ColumnState,
  GridApi,
  GridReadyEvent,
} from 'ag-grid-community';
import { MessageService } from 'primeng/api';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.css'],
})
export class OrderReportComponent {
  public isLoading: boolean = true;
  public instructions = ORDER_REPORT_INSTRUCTIONS;
  public instructionsOrder = ORDER_REPORT_INSTRUCTIONS_ORDER;
  public columnDefs: ColDef[] = [];
  public defaultColDef: ColDef = {};
  public rowData$!: Observable<OrderReportLine[]>;
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  private gridApi!: GridApi;
  private columnApi!: ColumnApi;
  private sortModel: ColumnState[] = [
    { colId: '', sort: 'asc', sortIndex: 0 },
    { colId: '', sort: 'desc', sortIndex: 1 },
    { colId: '', sort: 'desc', sortIndex: 2 },
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
    private _orderService: OrderService,
    private _excelService: ExcelService,
    private _messageService: MessageService,
    private _tableService: TableService
  ) {}

  ngOnInit(): void {
    this._messageService.add({
      severity: Severity.INFO,
      summary: 'Cargando...',
      detail: 'Estamos cargando las ventas, por favor aguarda.',
    });
    this.loadIOrderData();
  }

  loadIOrderData(): void {
    this._orderService.retrieveAllOrders().subscribe((response) => {
      console.log(response);
      this.rowData$ = of(this._orderService.mapOrderReportLine(response));
      this.isLoading = false;
    });
    this.columnDefs = this._tableService.getColDefsFromProperties(this._orderService.getOrderProperties());
    this.defaultColDef = this._tableService.getDefaultColDef();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.columnApi.applyColumnState({ state: this.sortModel });
    this.gridApi.sizeColumnsToFit();
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
    const filteredRowData: OrderReportLine[] = [];
    this.gridApi.forEachNodeAfterFilter((node) => {
      filteredRowData.push(node.data);
    });

    if (this._excelService.exportOrdersToExcel(filteredRowData)) {
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
    const rowData: OrderReportLine[] = [];
    this.gridApi.forEachNode((node) => {
      rowData.push(node.data);
    });

    if (this._excelService.exportOrdersToExcel(rowData)) {
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

  public getRowId(params: any) {
    return params.data.id;
  }
}
