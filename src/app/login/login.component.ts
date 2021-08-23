import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  statuslogin:any;
  focusin: boolean = true;
  regularForm: FormGroup;
  post:any;  
  usernameAlert:string="Please fill username";
  passwordAlert:string="Please fill password";
  loginAlert:string;
  loginError:boolean=false;
  returnUrl: string;

  constructor(private fb: FormBuilder,private service:ProductService,private rout:Router) { 
    this.regularForm = fb.group({
      'username' : [null, Validators.required],
      'password' : [null, Validators.required],
    });
  }

  ngOnInit(): void {
  }
  
checkLogin(){
  this.service.checkLogin(this.regularForm.value["username"],this.regularForm.value["password"]).subscribe(
    (response) => {
      localStorage.setItem("currentUser",JSON.stringify(response));
      this.rout.navigate(['home']);

    },
    (error) => {
      console.log(error);
    }
  )
  
}
logout()
{
  localStorage.removeItem("currentUser");
  this.rout.navigate(['']);
}

gotoRegister()
{
  this.rout.navigate(['register']);
}

}
