import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

@Injectable({
  providedIn: "root",
})
export class ExcellService {
  EXCEL_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  EXCEL_EXTENSION = ".xlsx";
  constructor(private httpClient: HttpClient) {}

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.EXCEL_TYPE });
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + this.EXCEL_EXTENSION
    );
  }

  exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.convertArrayToExportableJson(json)
    );
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  convertArrayToExportableJson(array: any[]) {
    let exportableNewArray = [];
    array.map((el) => {
      exportableNewArray.push({
        Barkod: el.asin + "BBLY",
        "Model Kodu": "???",
        Marka: el.companyname,
        Kategori: el.category,
        "Para Birimi": "TL",
        "Ürün Adı": el.title,
        "Ürün Açıklaması": el.description,
        "Piyasa Satış Fiyatı (KDV Dahil)": el.price + 15,
        "Trendyol'da Satılacak Fiyat (KDV Dahil)": el.price + 10,
        "Ürün Stok Adedi": el.availability,
        "Stok Kodu": "???",
        "KDV Oranı": 18,
        Desi: "???",
        "Görsel Linki": el.imagelink,
        "Sevkiyat Süresi": "???",
      });
    });
    return exportableNewArray;
  }
}
