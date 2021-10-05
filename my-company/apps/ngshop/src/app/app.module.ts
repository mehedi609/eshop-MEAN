import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductLlistComponent } from './pages/product-llist/product-llist.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SharedModule } from '../../../../shared-modules/shared.module';
import { NgshopRoutingModule } from './ngshop-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProductLlistComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [NgshopRoutingModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
