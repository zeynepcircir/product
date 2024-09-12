import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductMainComponent } from './product-main/product-main.component';

const routes: Routes = [
  {
    path: "home",
    component: ProductMainComponent,
    children: [
      {
        path: "",
        redirectTo: "product",  // Boş geldiğinde yönlendirilecek rota
        pathMatch: "full"
      },
      {
        path: "product",
        loadChildren: () => import('../modules/product/product.module').then(m => m.ProductModule),
      }
    ]
  },
  {
    path: '',
    redirectTo: 'home',   
    pathMatch: 'full',   
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
