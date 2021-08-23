import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Product } from '../app/Product';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public baseUrl: string = "http://localhost:8080/product";
  constructor(private http: HttpClient) { }

  public saveProduct(product: Product) {
    return this.http.post(this.baseUrl + "/saveProduct", product)

  }

  public updateProduct(product: any) {
    return this.http.post(this.baseUrl + "/editProduct", product);

  }
  public listProduct() {
    return this.http.get<Product>(this.baseUrl + "/getProductList");

  }

  public getProduct(id: string | number) {
    return this.http.get<Product>(this.baseUrl + "/getProduct?id=" + id)

  }
  public removeProduct(id: number) {
    return this.http.delete(this.baseUrl + "/removeProduct?id=" + id)

  }
  public checkLogin(userName:string,password:string)
  {
    return this.http.get(this.baseUrl+"/doLogin?userName="+userName+"&&password="+password)
  }
  public registerUser(user:User)
  {
    return this.http.post(this.baseUrl+"/registerUser",user);
  }
}


