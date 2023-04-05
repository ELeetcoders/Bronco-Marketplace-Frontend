import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ProductComponent } from './components/product/product.component';
import { ModalComponent } from './components/modal/modal.component';
import { HomeComponent } from './pages/home/home.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from  '@angular/material/select';
import { ProductPageComponent } from './pages/product-page/product-page.component'

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'create-post', component: CreatePostComponent},
  {path: 'search', component: HomeComponent},
  {path: 'product/:id', component: ProductPageComponent},
  // { path: '**', component: NotFoundComponent } // wildcard route
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InventoryComponent,
    ProductComponent,
    ModalComponent,
    HomeComponent,
    CreatePostComponent,
    ProductPageComponent,
  ],
  imports: [
    BrowserModule,
    MdbFormsModule,
    MdbModalModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
