import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductMainComponent } from './product-main/product-main.component';

const routes: Routes = [
  {
    path: "home",
    component: ProductMainComponent,
    children: [
      {
        path: "product",
        loadChildren: () => import('../modules/product/product.module').then(m => m.ProductModule),
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
