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
  mergeMap,
} from "rxjs/operators";
import {
  from,
  interval,
  Observable,
  observable,
  of,
  throwError,
  timer,
} from "rxjs";

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
  variatonsCount: number = 0; // Variations links of products
  pageCount: number;
  produtsCount: number; // without variatons
  spinnershow1: boolean = false;

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
        // define again form controls
        this.firstUrl = new FormGroup({
          url: new FormControl(form["url"], [Validators.required]),
          firstpage: new FormControl(1, [Validators.required]),
          finalpage: new FormControl(this.pageCount, [Validators.required]),
        });
      });
  }

  getVariationLinks(form: any) {
    this.spinnershow1 = true;
    this.showNotificationDontTouchAnything();
    this.httpservice
      .getProducts_Links(
        "http://localhost:4001/links",
        form["url"],
        form["firstpage"],
        form["finalpage"]
      ) // gets products' urls
      .pipe(
        tap((linkslist: string[]) => {
          this.produtsCount = linkslist.length;
          return linkslist;
        })
      )
      .subscribe((result) => {
        from(result)
          .pipe(
            mergeMap((link) =>
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
                    error.pipe(
                      delay(1000),
                      tap(() => console.log("Retrying... "))
                    )
                  )
                )
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
              this.variatonsCount = this.httpservice.variationLinks.length;
            },

            (err) => console.log(err),
            () => console.log("Complete")
          );
      });
  }

  showNotification(pagecount) {
    $.notify(
      {
        icon: "notifications",
        message:
          "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer.",
      },
      {
        type: "info",
        timer: 2000,
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

  showNotificationDontTouchAnything() {
    $.notify(
      {
        icon: "notifications",
        message:
          "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer.",
      },
      {
        type: "danger",
        timer: 2000,
        placement: {
          from: "top",
          align: "center",
        },
        template: `  <div class="alert alert-danger">
         <button mat-button type="button" class="close" data-dismiss="alert" aria-label="Close">
             <i class="material-icons">close</i>
         </button>
         <span>
             Varyasyon hesaplama sırasında lütfen herhangi bir işlem yapmayınız.</span>
     </div>`,
      }
    );
  }
}
