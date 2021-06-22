import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { HttpserviceService } from "../httpservice.service";
import {
  map,
  retryWhen,
  tap,
  take,
  delay,
  concatMap,
  filter,
  switchMap,
} from "rxjs/operators";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ExcellService } from "app/excell.service";
import { ProductService } from "../product.service";

import { DecimalPipe } from "@angular/common";
import { Observable } from "rxjs";

import { NgbdSortableHeader, SortEvent } from "app/sortable.directive";
import { Product } from "../../Models/Product";

@Component({
  selector: "ngbd-table-complete",
  templateUrl: "./productlist.component.html",
  styleUrls: ["./productlist.component.css"],
  providers: [ProductService, DecimalPipe],
})
export class ProductlistComponent implements OnInit {
  products$: Observable<Product[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  products: any[] = [];
  countOfVariationLinks: number;
  singleProduct;
  show = true;

  initialSort: SortEvent = { column: "asin", direction: "asc" }; // to start to dispaly products as initial
  constructor(
    private httpservice: HttpserviceService,
    private modalService: NgbModal,
    private excellservice: ExcellService,
    private productservice: ProductService
  ) {
    this.products$ = productservice.products$;
    this.total$ = productservice.total$;
  }

  ngOnInit(): void {}

  getProducts() {
    this.httpservice.variationLinks.map((productlink: string) => {
      this.httpservice
        .getProducts("http://localhost:4001/product", productlink)
        .pipe(
          map((val) => {
            if (val == null) throw new Error("Invalid Value");
            return val;
          }),
          retryWhen((error) =>
            error.pipe(tap(() => console.log("Retrying... ")))
          )
        )
        .subscribe(
          (val: any) => {
            this.products.push(val);
            this.productservice.producstarray.push(val);
            this.onSort(this.initialSort);
          },

          (err) => console.log(err),
          () => console.log("Complete")
        );
    });
  }

  listProducts() {
    this.countOfVariationLinks = this.httpservice.variationLinks.length;
    this.getProducts();
  }

  openNewWindow(link: string) {
    window.open(
      link,
      "_blank",
      "location=yes,height=570,width=520,scrollbars=yes,status=yes"
    );
  }

  openLg(content, product?) {
    this.singleProduct = product;
    this.modalService.open(content, { size: "xl" });
  }

  excell(products) {
    this.excellservice.exportAsExcelFile(this.products, "Ürünler");
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = "";
      }
    });

    this.productservice.sortColumn = column;
    this.productservice.sortDirection = direction;
  }
}
