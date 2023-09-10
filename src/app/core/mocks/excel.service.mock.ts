import { ExcelService } from "@core/services/excel-service/excel.service";

export const excelServiceMock: Partial<ExcelService> = {
    exportBooksToExcel: jest.fn(),
    readExcelFile: jest.fn(),

  };
