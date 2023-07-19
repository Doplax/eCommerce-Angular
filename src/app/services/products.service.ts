import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product }from '../interfaces/product.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private Http: HttpClient
  ) { }

  getAllProducts(){
    // Con <Product> Le estamos diciendo el tipo de objeto que esperamos que nos devuelva
    return this.Http.get<Product[]>('https://young-sands-07814.herokuapp.com/api/products');
  }
}
