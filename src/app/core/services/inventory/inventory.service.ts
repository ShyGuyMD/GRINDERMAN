import { Injectable } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Option } from '@core/models/option';
import { Genre } from '@core/models/genre';
import { Book_Properies, Order_Properties } from '@shared/constants';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor() {}

  public getColDefsFromProperties(properties: Option[]): ColDef[] {
    return properties
      .filter(
        (property) =>
          property.key !== Book_Properies.COVER &&
          property.key !== Book_Properies.IMAGES
      )
      .map((property) => {
        const colDef: ColDef = {
          headerName: property.value,
          field: property.key,
          pinned: property.key === Book_Properies.TITLE ? 'left' : null,
          cellStyle: (params) => {
            if (
              params.colDef.field === Order_Properties.ML_TAX ||
              params.colDef.field === Order_Properties.DISCOUNT_TOTAL
            ) {
              return { color: 'red' };
            }
            if (
              params.colDef.field === Order_Properties.TOTAL
            ) {
              return { color: 'green' };
            }
            return null;
          },
          valueFormatter: (params) => {
            switch (params.colDef.field) {
              case Book_Properies.GENRE:
                return this.listToString(params);
              case Order_Properties.ITEMS:
                return this.listToString(params);
              case Book_Properies.PRICE:
                return this.getCurrencyFormatter(params);
              case Order_Properties.DISCOUNT_TOTAL:
                return this.getDiscountFormatter(params);
              case Order_Properties.ML_TAX:
                return this.getTaxFormatter(params);
              case Order_Properties.SUBTOTAL:
                return this.getCurrencyFormatter(params);
              case Order_Properties.TOTAL:
                return this.getCurrencyFormatter(params);
              case Book_Properies.IS_ACTIVE:
                return this.getStatusFormatter(params);
              case Book_Properies.IS_HARDCOVER:
                return this.getHardcoverFormatter(params);
              case Book_Properies.IS_NEW:
                return this.getNewUsedFormatter(params);
              case Order_Properties.DATE:
                return this.getDateFormatter(params);
              default:
                return params.value;
            }
          },
          ...this.getDefaultColDef(),
        };

        return colDef;
      });
  }

  getDefaultColDef(): ColDef {
    return {
      sortable: true,
      filter: true,
      resizable: true,
    };
  }

  private listToString(params: any): string {
    if (params.value && Array.isArray(params.value)) {
      return params.value.map((item: any) => item.name).join(', ');
    }
    return '';
  }

  private getDateFormatter(params: any): string {
    console.log(params);
    const day = String(params.value.getDate()).padStart(2, '0');
    const month = String(params.value.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
    const year = params.value.getFullYear();
    return `${day}/${month}/${year}`;
  }

  private getCurrencyFormatter(params: any): string {
    return '$' + params.value.toFixed(2);
  }

  private getTaxFormatter(params: any): string {
    if (params.value > 0) {
      return `(${this.getCurrencyFormatter(params)})`;
    } else return '';
  }

  private getDiscountFormatter(params: any): string {
    if (params.value > 0) {
      return `-${this.getCurrencyFormatter(params)}`;
    } else return '';
  }

  private getStatusFormatter(params: any): string {
    const status = params.value as boolean;
    return status ? 'Activo' : 'Inactivo';
  }

  private getHardcoverFormatter(params: any): string {
    const isHardcover = params.value as boolean;
    return isHardcover ? 'Tapa Dura' : 'Tapa Blanda';
  }

  private getNewUsedFormatter(params: any): string {
    const isNew = params.value as boolean;
    return isNew ? 'Nuevo' : 'Usado';
  }


}
