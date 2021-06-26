import { Routes } from "@angular/router";

import { UserProfileComponent } from "../../user-profile/user-profile.component";

import { VariationsLinksComponent } from "app/variations-links/variations-links.component";
import { ProductlistComponent } from "app/productlist/productlist.component";
import { GetSingleProductComponent } from "app/get-single-product/get-single-product.component";

export const AdminLayoutRoutes: Routes = [
  //{
  // path: '',
  // children: [ {
  //   path: 'userprofile',
  //   component: UserProfileComponent

  // }
  { path: "variations", component: VariationsLinksComponent },
  { path: "productlist", component: ProductlistComponent },
  { path: "singleproduct", component: GetSingleProductComponent },
  { path: "user-profile", component: UserProfileComponent },
];
