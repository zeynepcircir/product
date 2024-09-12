import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { ProductMainComponent } from 'src/app/layout/product-main/product-main.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "all-products",  // Boş rotaya gelirse all-products a yönlendirme
    pathMatch: "full"
  },
  {
    path: ":categoryName",
    component: ProductTableComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
