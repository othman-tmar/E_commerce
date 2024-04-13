import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InsertproductComponent } from './products/insertproduct/insertproduct.component';
import { DetailsproductComponent } from './products/detailsproduct/detailsproduct.component';
import { UpdateproductComponent } from './products/updateproduct/updateproduct.component';
import { ListproductsComponent } from './products/listproducts/listproducts.component';
import { UpdatecategoryComponent } from './categories/updatecategory/updatecategory.component';
import { InsertcategoryComponent } from './categories/insertcategory/insertcategory.component';
import { InsertsubcategoryComponent } from './subcategories/insertsubcategory/insertsubcategory.component';
import { UpdatesubcategoryComponent } from './subcategories/updatesubcategory/updatesubcategory.component';
import { ListsubcategoriesComponent } from './subcategories/listsubcategories/listsubcategories.component';
import {  HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import { AngularFireModule} from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { OrdersComponent } from './orders/orders.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { ListcategoriesComponent } from './categories/listcategories/listcategories.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {MatGridListModule} from '@angular/material/grid-list';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DetailsorderComponent } from './orders/detailsorder/detailsorder.component';
import { ListusersComponent } from './users/listusers/listusers.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CoreModule } from './core/core.module';
import { ListadminsComponent } from './admins/listadmins/listadmins.component';
import { UpdateadminComponent } from './admins/updateadmin/updateadmin.component';
import { ForbiddenComponent } from './forbidden/forbidden/forbidden.component';

import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';



@NgModule({
  declarations: [
    AppComponent,
    InsertproductComponent,
    DetailsproductComponent,
    UpdateproductComponent,
    ListproductsComponent,
    UpdatecategoryComponent,
    InsertcategoryComponent,
    InsertsubcategoryComponent,
    UpdatesubcategoryComponent,
    ListsubcategoriesComponent,
    OrdersComponent,
    DashboardComponent,
    ListcategoriesComponent,
    DetailsorderComponent,
    ListusersComponent,
    LoginComponent,
    RegisterComponent,
    ListadminsComponent,
    UpdateadminComponent,
    ForbiddenComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    AngularFireStorageModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularEditorModule,
    MatGridListModule,
    NgxDropzoneModule,
    CoreModule,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
