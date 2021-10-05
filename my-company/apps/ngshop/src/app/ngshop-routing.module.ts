import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductLlistComponent } from './pages/product-llist/product-llist.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'products', component: ProductLlistComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class NgshopRoutingModule {}
