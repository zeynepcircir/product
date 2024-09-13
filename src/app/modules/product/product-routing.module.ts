import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductTableComponent } from './product-table/product-table.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "all-products",  
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
