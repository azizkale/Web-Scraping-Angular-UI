import { Injectable } from "@angular/core";
import { excell } from "excel4node";
import { Observable } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ExcellService {
  constructor(private httpClient: HttpClient) {}

  createExcellSheet(serverurl: string, productarray): Observable<any> {
    let params = new HttpParams().set(
      "productsarray",
      JSON.stringify(productarray)
    );
    return this.httpClient.get(serverurl, {
      observe: "body",
      responseType: "json",
      params,
    });
  }

  // createExcellSheet(productarray: Array<any>): void {
  //   const workbook = new this.excell.Workbook();
  //   const style = workbook.createStyle({
  //     font: { color: "#0101FF", size: 11 },
  //   });

  //   const worksheet = workbook.addWorksheet("Ürünler");

  //   productarray.forEach((row, rowIndex) => {
  //     let colIndex = 0;
  //     worksheet.cell(1, 1).string("Barkod");
  //     worksheet.cell(1, 2).string("Model Kodu");
  //     worksheet.cell(1, 3).string("Marka");
  //     worksheet.cell(1, 4).string("Kategori");
  //     worksheet.cell(1, 5).string("Para Birimi");
  //     worksheet.cell(1, 6).string("Ürün Adı");
  //     worksheet.cell(1, 7).string("Ürün Açıklaması");
  //     worksheet.cell(1, 8).string("Piyasa Satış Fiyatı (KDV Dahil)");
  //     worksheet.cell(1, 9).string("Trendyol'da Satılacak Fiyat (KDV Dahil)");
  //     worksheet.cell(1, 10).string("Ürün Stok Adedi");
  //     worksheet.cell(1, 11).string("Stok Kodu");
  //     worksheet.cell(1, 12).string("KDV Oranı");
  //     worksheet.cell(1, 13).string("Desi");
  //     worksheet.cell(1, 14).string("Görsel Linki");
  //     worksheet.cell(1, 15).string("Sevkiyat Süresi");
  //     worksheet
  //       .cell(rowIndex + 1, colIndex++ + 1)
  //       .string(row.asin + "BBLY")
  //       .style(style);
  //     worksheet
  //       .cell(rowIndex + 1, colIndex++ + 1)
  //       .string("???")
  //       .style(style);
  //     worksheet
  //       .cell(rowIndex + 1, colIndex++ + 1)
  //       .string(row.companyname)
  //       .style(style);
  //     worksheet
  //       .cell(rowIndex + 1, colIndex++ + 1)
  //       .string("TL")
  //       .style(style);
  //     worksheet
  //       .cell(rowIndex + 1, colIndex++ + 1)
  //       .string(row.title)
  //       .style(style);
  //     worksheet
  //       .cell(rowIndex + 1, colIndex++ + 1)
  //       .string(row.description)
  //       .style(style);
  //     worksheet
  //       .cell(rowIndex + 1, colIndex++ + 1)
  //       .string(row.price + 15)
  //       .style(style);
  //     worksheet
  //       .cell(rowIndex + 1, colIndex++ + 1)
  //       .string(row.price + 10)
  //       .style(style);
  //     worksheet
  //       .cell(rowIndex + 1, colIndex++ + 1)
  //       .string(row.availability)
  //       .style(style);
  //     worksheet
  //       .cell(rowIndex + 1, colIndex++ + 1)
  //       .string("???")
  //       .style(style);
  //     worksheet
  //       .cell(rowIndex + 1, colIndex++ + 1)
  //       .string(18)
  //       .style(style);
  //     worksheet
  //       .cell(rowIndex + 1, colIndex++ + 1)
  //       .string("???")
  //       .style(style);
  //     worksheet
  //       .cell(rowIndex + 1, colIndex++ + 1)
  //       .string(row.imagelink)
  //       .style(style);
  //     worksheet
  //       .cell(rowIndex + 1, colIndex++ + 1)
  //       .string("???")
  //       .style(style);
  //   });

  //   return workbook;
  // }
}
