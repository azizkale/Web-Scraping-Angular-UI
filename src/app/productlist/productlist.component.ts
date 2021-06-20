import { Component, OnInit } from "@angular/core";
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

@Component({
  selector: "app-productlist",
  templateUrl: "./productlist.component.html",
  styleUrls: ["./productlist.component.css"],
})
export class ProductlistComponent implements OnInit {
  products: any[] = [];
  countOfVariationLinks: number;
  singleProduct;
  constructor(
    private httpservice: HttpserviceService,
    private modalService: NgbModal,
    private excellservice: ExcellService
  ) {}

  ngOnInit(): void {
    this.countOfVariationLinks = this.httpservice.variationLinks.length;
    this.getProducts();
    console.log(this.products);
  }

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
          },

          (err) => console.log(err),
          () => console.log("Complete")
        );
    });
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
    this.excellservice
      .createExcellSheet(
        "http://localhost:4001/excell",
        JSON.stringify(this.products)
      )
      .subscribe((response) => {});
  }
}
