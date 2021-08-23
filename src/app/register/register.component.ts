import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResponse } from '../api-response';
import { ProductService } from '../product.service';
import {User} from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
user:User;
signupForm:FormGroup
  constructor(private service:ProductService,private route:Router) {
    this.signupForm=new FormGroup({
      'name':new FormControl(null,[Validators.required]),
      'userName':new FormControl(null,[Validators.required]),
      'password':new FormControl(null,[Validators.required]),
      'verifyPassword':new FormControl(null,[Validators.required,this.samePassword])
    })
   }

  ngOnInit(): void {
  }

  onSubmit(){
    this.user=new User();
    this.user.name=this.signupForm.value["name"];
    this.user.password=this.signupForm.value["password"];
    this.user.userName=this.signupForm.value["userName"];
    this.service.registerUser(this.user).subscribe(
      (response)=>{
        let resp=response as ApiResponse;
        alert(resp.message);
        
        this.route.navigate(['']);
      },
      (error)=>{
        let resp=error as ApiResponse;
        alert(resp.message);
      }
    )

  }
  onSignin1(){
    this.route.navigate(['']);


  }

  samePassword(control: FormControl) {
    if (!control || !control.parent) {
      return null;
    }
    if (control.value !== control.parent.get('password').value) {
      return {'passwordMismatch': true}
    }
    return null;
  }

}
