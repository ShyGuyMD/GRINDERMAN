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


  getColDefsFromProperties(properties: Option[]): ColDef[] {
    const defaultColDef: ColDef = this.getDefaultColDef();
    return properties.filter(p => p.key !== Book_Properies.COVER && p.key !== Book_Properies.IMAGES).map((property) => {
      const colDef: ColDef = {
        headerName: property.value, 
        field: property.key,
        pinned: property.key === Book_Properies.TITLE ? 'left' : null,
        valueFormatter: (params) => {
          console.log(params);
            if (params.colDef.field === Book_Properies.GENRE) {
              return this.genresToString(params);
            }else if(params.colDef.field === Book_Properies.IS_HARDCOVER){
              console.log(params)
            }
            return params.value;
        },
        ...defaultColDef
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

}
