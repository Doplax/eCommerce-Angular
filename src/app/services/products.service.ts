import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product,CreateProductDTO }from '../interfaces/product.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = ' https://api.escuelajs.co/api/v1/products'

  constructor(
    private Http: HttpClient
  ) { }

  getAllProducts(){
    // Con <Product> Le estamos diciendo el tipo de objeto que esperamos que nos devuelva
    return this.Http.get<Product[]>(this.apiUrl);
  }

  getProduct(id:number) {
    return this.Http.get<Product>(`${this.apiUrl}products${id}`);
  }

  create(data: CreateProductDTO) {
    return this.Http.post<Product>(this.apiUrl,data);
  }


}
