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

@Component({
  selector: "app-productlist",
  templateUrl: "./productlist.component.html",
  styleUrls: ["./productlist.component.css"],
})
export class ProductlistComponent implements OnInit {
  products: any[] = [];
  countOfVariationLinks: number;
  constructor(private httpservice: HttpserviceService) {}

  ngOnInit(): void {
    this.countOfVariationLinks = this.httpservice.variationLinks.length;
    this.getProducts();
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
}
