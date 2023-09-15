import { Injectable } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Option } from '@core/models/option';
import { Genre } from '@core/models/genre';
import { Book_Properies } from '@shared/constants';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor() { }


  public getColDefsFromProperties(properties: Option[]): ColDef[] {
    return properties
      .filter((property) => property.key !== Book_Properies.COVER && property.key !== Book_Properies.IMAGES)
      .map((property) => {
        const colDef: ColDef = {
          headerName: property.value,
          field: property.key,
          pinned: property.key === Book_Properies.TITLE ? 'left' : null,
          valueFormatter: (params) => {
            switch (params.colDef.field) {
              case Book_Properies.GENRE:
                return this.genresToString(params);
              case Book_Properies.PRICE:
                return this.getCurrencyFormatter(params);
              case Book_Properies.IS_ACTIVE:
                return this.getStatusFormatter(params);
              case Book_Properies.IS_HARDCOVER:
                return this.getHardcoverFormatter(params);
              case Book_Properies.IS_NEW:
                return this.getNewUsedFormatter(params);
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

  }
}


private genresToString(params: any): string {
  console.log()
  if (params.value && Array.isArray(params.value)) {
    return params.value.map((genre: Genre) => genre.name).join(', ');
  }
  return '';
}

private getCurrencyFormatter(params: any): string {
  return '$ ' + params.value.toFixed(2);
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
