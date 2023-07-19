import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Product }from '../interfaces/product.interface';


@Injectable({
  providedIn: 'root' // El alcance del servivio
})
export class StoreService {
  private myShoppingCart: Product[] = []; // Aqui guardaremos los productos
  private myCart = new BehaviorSubject<Product[]>([]);

  //Se usa un $ cuando se trata de un observable
  myCart$ = this.myCart.asObservable();

  //constructor() { }

  addProduct(product: Product) {
    this.myShoppingCart.push(product) // Agregamos el producto al carrito
    this.myCart.next(this.myShoppingCart);
    console.log(product);
    console.log(this.myShoppingCart);


  }

  //Como myShoppingCart es privado, usaremos un método para acceder a la información
  getShoppingCart() { return this.myShoppingCart}

  getTotal() { return this.myShoppingCart.reduce((sum, product) => sum + product.price,0) }

}
