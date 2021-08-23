import { ApiResponse } from './../api-response';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service'
import { Product } from '../Product';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  public productList: any;
  public product!: Product;
  regularForm!: FormGroup;
  constructor(private service: ProductService,private rout:Router) { }

  ngOnInit(): void {
    this.product = new Product();

    this.getProductList();
    this.initializeForm();


  }

  deleteProduct(id: number) {
    // console.log(id);
    this.service.removeProduct(id).subscribe(
      (response) => {
        let resp = response as ApiResponse;
        alert(resp.message);
        this.getProductList();
      },
      (error) => {
        alert(error.error.message)
        // console.log(error);
      }
    )
  }
  getProductList() {
    this.service.listProduct().subscribe(
      (response) => {
        this.productList = response;
      },
      (error) => {
        console.log(error);
      }
    )
  }
  reset() {
    // console.log("reset")
    // this.product = new Product();
    this.regularForm.reset();
  }

  initializeForm() {
    this.regularForm = new FormGroup({
      'productName': new FormControl(this.product.productName, [Validators.required]),
      'sku': new FormControl(this.product.sku, [Validators.required]),
      'price': new FormControl(this.product.price, [Validators.required]),
      'desc': new FormControl(this.product.description, [Validators.required]),
      'stockLevel': new FormControl(this.product.stockLevel, [Validators.required]),
      'email': new FormControl(this.product.email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    }, { updateOn: 'blur' });
  }

  saveProduct() {
    let product = new Product();
    product.description = this.regularForm.value["desc"];
    product.email = this.regularForm.value["email"];
    product.price = this.regularForm.value["price"];
    product.productName = this.regularForm.value["productName"];
    product.sku = this.regularForm.value["sku"];
    product.stockLevel = this.regularForm.value["stockLevel"];
    product.id = this.product.id
    this.service.saveProduct(product).subscribe(
      (data) => {
        let message = data as ApiResponse
        alert(message.message)
        this.reset();
        this.getProductList();
      }, (error) => {
        alert(error.error.message)
      }
    );
  }

  getProduct(id: number) {
    this.service.getProduct(id).subscribe(
      (response) => {
        this.product = new Product();
        this.product = response as Product;
        this.initializeForm();
        console.log(this.product);
      },
      (error) => {
        console.log(error.error.message);
      }
    )
  }

  logout()
{
  localStorage.removeItem("currentUser");
  this.rout.navigate(['']);
}


}
