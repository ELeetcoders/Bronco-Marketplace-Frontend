import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ProductComponent } from './components/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InventoryComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    MdbFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
