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

declare var $: any;

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
  productscount: number = 0; // products which are link to variationlinks
  pageCount: number;
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

  getPageCount(form: any) {
    this.httpservice
      .getPageCount("http://localhost:4001/pagecount", form["url"])
      .subscribe((pagecount) => {
        this.pageCount = +pagecount;
        this.showNotification(this.pageCount);
        this.firstUrl = new FormGroup({
          firstpage: new FormControl(1, [Validators.required]),
          finalpage: new FormControl(this.pageCount, [Validators.required]),
        });
      });
  }

  getVariationLinks(form: any) {
    this.httpservice
      .getProducts_Links(
        "http://localhost:4001/links",
        form["url"],
        form["firstpage"],
        form["finalpage"]
      ) // gets products' urls
      .subscribe((productlinksinfo: any) => {
        console.log("ürün sayısı: " + productlinksinfo.linksCount);
        console.log(productlinksinfo.linklist);
        productlinksinfo.linklist.map((link) => {
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
                  // this.variationslinks.push(link);
                  this.httpservice.variationLinks.push(link);
                });
                // this.productscount = this.variationslinks.length;
                this.productscount = this.httpservice.variationLinks.length;
              },

              (err) => console.log(err),
              () => console.log("Complete")
            );
        });
      });
  }

  showNotification(pagecount) {
    // const type = ["", "info", "success", "warning", "danger"];

    // const color = Math.floor(Math.random() * 4 + 1);

    $.notify(
      {
        icon: "notifications",
        message:
          "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer.",
      },
      {
        type: "info",
        timer: 4000,
        placement: {
          from: "top",
          align: "center",
        },
        template: `  <div class="alert alert-info">
         <button mat-button type="button" class="close" data-dismiss="alert" aria-label="Close">
             <i class="material-icons">close</i>
         </button>
         <span>
             Bu link ile ${pagecount} sayfadan ürün çekmek üzeresiniz.</span>
     </div>`,
      }
    );
  }
}
