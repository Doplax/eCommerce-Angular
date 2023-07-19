import { Product }from '../../interfaces/product.interface';
import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service'
import { ProductsService } from '../../services/products.service'


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {
  myShoppingCart: Product[] = [];
  total: number = 0;
  today = new Date();
  date = new Date(2021, 1, 21);

  products: Product[] = [];

  constructor (
    private storeService: StoreService,
    private ProductsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit () {
    // Ponemos esto aqui en vez de el constructor, ya que se trata de una peticion asincrona
    this.ProductsService.getAllProducts()
      .subscribe(data => {this.products = data})
  }

  onAddToShoppiongCart(product: Product): void {
    this.storeService.addProduct(product)
    this.total = this.storeService.getTotal()

  }
}
