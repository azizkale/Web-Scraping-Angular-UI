import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpserviceService } from "app/httpservice.service";
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
  selector: "app-get-single-product",
  templateUrl: "./get-single-product.component.html",
  styleUrls: ["./get-single-product.component.css"],
})
export class GetSingleProductComponent implements OnInit {
  purl = new FormGroup({
    url: new FormControl("", [Validators.required]),
  });

  singleProduct: object;
  constructor(private httpservice: HttpserviceService) {}

  ngOnInit(): void {}
  getSingleProduct(form: any) {
    this.httpservice
      .getProducts("http://localhost:4001/product", form["url"])
      .pipe(
        map((val) => {
          if (val == null) throw new Error("Invalid Value");
          return val;
        }),
        retryWhen((error) => error.pipe(tap(() => console.log("Retrying... "))))
      )
      .subscribe(
        (val: object) => {
          this.singleProduct = val;
          console.log(val);
        },

        (err) => console.log(err),
        () => console.log("Complete")
      );
  }
}
