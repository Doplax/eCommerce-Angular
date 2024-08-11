import { Injectable } from '@angular/core';
import { HttpClient , HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError, map , zip } from 'rxjs';


import { Product,CreateProductDTO, UpdateProductDTO }from '../interfaces/product.interface';
import { checkTime } from '../interceptors/time.interceptor';
//import { environment } from "../../environments/environment.prod"



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://api.escuelajs.co/api/v1/products/'

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
    return this.Http.get<Product[]>(this.apiUrl,{params, context: checkTime()})
      .pipe(retry(3),
      map(products => products.map(item => {
        return {
          ...item,
          taxes: 0.21 * item.price
        }
      })))


  }

  fetchReadAndUpdate (id:number, dto: UpdateProductDTO) {
    return zip(
      this.getProduct(id),
      this.upDate(id, {title: 'nuevo'})
    )
  }

  getProduct(id:number) {
    return this.Http.get<Product>(`${this.apiUrl}${id}`)
    .pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 500) {
        return throwError('Ups, Halgo está fallando en el servidor')

      }
      if (error.status === HttpStatusCode.NotFound) {// Seria un error 404
        return throwError('Ups, El producto no existe')

      }
      if (error.status === HttpStatusCode.Unauthorized) {// Seria un error 401
        return throwError('Ups, No estás autorizado')

      }
        return throwError('Ups, ha habido un error')

    }));
  }

  getProductsByPage(limit: number, offset: number) {
    return this.Http.get<Product[]>(`${this.apiUrl}`,{
      params: {limit, offset}
    }).pipe(
      retry(3),// hará 3 intentos
      map(products => products.map(product => {
        return {
          ...product,
          taxes: .21 * product.price
        }
      })
    ))

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
