import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HttpserviceService {
  constructor(private httpClient: HttpClient) {}

  getProducts_Links(serverurl: string, firsturl: string): Observable<any> {
    let params = new HttpParams().set("firsturl", firsturl);
    return this.httpClient.get(serverurl, {
      observe: "body",
      responseType: "json",
      params,
    });
  }
  getProducts(url: string, productlink: string): Observable<any> {
    let params = new HttpParams().set("productlink", productlink);
    return this.httpClient.get(url, {
      observe: "body",
      responseType: "json",
      params,
    });
  }

  getVariationLinksOfProduct(url: string, producturl: string) {
    let params = new HttpParams().set("producturl", producturl);
    return this.httpClient.get(url, {
      observe: "body",
      responseType: "json",
      params,
    });
  }
}
