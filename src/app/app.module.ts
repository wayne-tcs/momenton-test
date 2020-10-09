import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TreeModule } from 'primeng/tree';

import { AppComponent } from './app.component';
import { EmployeesViewComponent } from './component/employees-view/employees-view.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesViewComponent
  ],
  imports: [
    BrowserModule,
    TreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
