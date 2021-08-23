import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoComponent } from './demo/demo.component';
import { LoginComponent } from './login/login.component';
import {AuthguardService} from '../app/AuthGuardService';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [{
  path:'home',component:DemoComponent,canActivate: [AuthguardService]},
  {path:'',component:LoginComponent},{path:'register',component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
