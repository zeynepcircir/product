import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: '',
        data: { pageTitle: 'Ana Sayfa' },
        loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
    },
];


  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  