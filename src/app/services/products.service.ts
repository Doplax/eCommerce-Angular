import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
import { retry } from 'rxjs/operators';

import { Product,CreateProductDTO, UpdateProductDTO }from '../interfaces/product.interface';

import { environment } from "../../environments/environment.prod"


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}`

  constructor(
    private Http: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?: number){
    // Con <Product> Le estamos diciendo el tipo de objeto que esperamos que nos devuelva
    const params = new HttpParams();
    if(limit && offset) {
      params.set('limit', limit);
      params.set('offset', offset);
    }
    return this.Http.get<Product[]>(this.apiUrl,{params})
      .pipe(
        retry(3)
      )
    ;

  }

  getProduct(id:number) {
    return this.Http.get<Product>(`${this.apiUrl}${id}`);
  }

  getProductsByPage(limit: number, offset: number) {
    return this.Http.get<Product[]>(`${this.apiUrl}`,{
      params: {limit, offset}
    })

  }

  create(data: CreateProductDTO) {
    return this.Http.post<Product>(this.apiUrl,data);
  }

  upDate(id: number, dto: UpdateProductDTO){
    return this.Http.put<Product>(this.apiUrl+id,dto);
  }

  delete(id: number){
    return this.Http.delete<Product>(this.apiUrl+id)
  }

}
