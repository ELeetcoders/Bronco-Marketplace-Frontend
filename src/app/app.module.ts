import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import {MatInputModule} from '@angular/material/input';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete'
import {MatSnackBarModule } from '@angular/material/snack-bar';
import { ImageCropperModule } from 'ngx-image-cropper';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ProductComponent } from './components/product/product.component';
import { ProductModalComponent } from './components/product-modal/product-modal.component';
import { HomeComponent } from './pages/home/home.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from  '@angular/material/select';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MessagesComponent } from './pages/messages/messages.component'
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { CropperModalComponent } from './components/cropper-modal/cropper-modal.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ViewProfileComponent } from './pages/view-profile/view-profile.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'create-post', component: CreatePostComponent},
  {path: 'search', component: HomeComponent},
  {path: 'product/:id', component: ProductPageComponent},
  {path: 'messages', component: MessagesComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'edit-profile', component: EditProfileComponent},
  {path: 'view-profile', component: ViewProfileComponent},
  { path: '**', component: NotFoundComponent } // wildcard route
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InventoryComponent,
    ProductComponent,
    ProductModalComponent,
    HomeComponent,
    CreatePostComponent,
    ProductPageComponent,
    NotFoundComponent,
    MessagesComponent,
    SignInComponent,
    SignUpComponent,
    CropperModalComponent,
    EditProfileComponent,
    ViewProfileComponent,
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
    ReactiveFormsModule,
    MdbDropdownModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    ImageCropperModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore())
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
