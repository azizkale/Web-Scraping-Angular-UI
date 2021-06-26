import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";

import { AppComponent } from "./app.component";

import { UserProfileComponent } from "./user-profile/user-profile.component";
import { AgmCoreModule } from "@agm/core";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { VariationsLinksComponent } from "./variations-links/variations-links.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ProductlistComponent } from "./productlist/productlist.component";
import { GetSingleProductComponent } from "./get-single-product/get-single-product.component";
import { NgbdSortableHeader } from "./sortable.directive";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: "YOUR_GOOGLE_MAPS_API_KEY",
    }),
    NgbModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    VariationsLinksComponent,
    ProductlistComponent,
    GetSingleProductComponent,
    NgbdSortableHeader,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
