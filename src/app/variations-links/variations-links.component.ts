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
import { interval, Observable, observable, of, throwError, timer } from "rxjs";
@Component({
  selector: "app-variations-links",
  templateUrl: "./variations-links.component.html",
  styleUrls: ["./variations-links.component.css"],
})
export class VariationsLinksComponent implements OnInit {
  firstUrl = new FormGroup({
    url: new FormControl("", [Validators.required]),
  });

  variations: object[] = [];
  variationslinks: string[] = [];
  productscount: number = 0; // products which are link to variationlinks

  constructor(
    private fb: FormBuilder,
    private httpservice: HttpserviceService
  ) {}

  ngOnInit(): void {}

  openNewWindow(link: string) {
    window.open(
      link,
      "_blank",
      "location=yes,height=570,width=520,scrollbars=yes,status=yes"
    );
  }

  getVariationLinks(form: any) {
    this.httpservice
      .getProducts_Links("http://localhost:4001/links", form["url"]) // gets products' url
      .subscribe((productlinks: string[]) => {
        console.log(productlinks);
        productlinks.map((link) => {
          this.httpservice
            .getVariationLinksOfProduct(
              // gets products' variation urls
              "http://localhost:4001/variationlinksofproduct",
              link
            )
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
                this.variations.push(val);
                val.variationsLinksOfProduct.map((link: string) => {
                  this.variationslinks.push(link);
                  this.httpservice.variationLinks.push(link);
                });
                this.productscount = this.variationslinks.length;
              },

              (err) => console.log(err),
              () => console.log("Complete")
            );
        });
      });
  }
}
