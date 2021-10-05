import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SharedModule } from '../../../../shared-modules/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ShellComponent,
    SidebarComponent,
  ],
  imports: [SharedModule, AdminRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
