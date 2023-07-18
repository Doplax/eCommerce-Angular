import { Injectable } from '@angular/core';
import { Product }from '../interfaces/product.interface';


@Injectable({
  providedIn: 'root' // El alcance del servivio
})
export class StoreService {
  private myShoppingCart: Product[] = []; // Aqui guardaremos los productos


  constructor() { }

  addProduct(product: Product) {
    this.myShoppingCart.push(product) // Agregamos el producto al carrito


  }

  //Como myShoppingCart es privado, usaremos un método para acceder a la información
  getShoppingCart() { return this.myShoppingCart}

  getTotal() { return this.myShoppingCart.reduce((sum, product) => sum + product.price,0) }

}
