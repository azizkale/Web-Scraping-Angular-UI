import { ProductSubInfos } from "./ProductSubInfos";
export interface Product {
  link: string;
  title: string;
  price: string;
  availability: string;
  companyname: string;
  color: string;
  size: string;
  //   description: [string];
  //   info: [ProductSubInfos];
  //   technicalDetails: [ProductSubInfos];
  //   additionalInfo: [ProductSubInfos];
  seller: string;
  asin: string;
  category: string;
  imagelink: string;
}
