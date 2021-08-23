import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {AuthguardService} from '../app/AuthGuardService';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
 
  ],
  providers: [ProductService,AuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
