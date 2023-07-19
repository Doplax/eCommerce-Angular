import { Product,CreateProductDTO }from '../../interfaces/product.interface';
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
  total = 0;
  products: Product[] = [];
  showProductDetail =  false;
  productChosen!: Product ;

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

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail
  }

  onShowDetail(id: number):void {
    this.ProductsService.getProduct(id)
      .subscribe(data => {
        this.toggleProductDetail()
        console.log('product',data)
        this.productChosen = data;
      })
  }

  createNewProduct(){
    const product: CreateProductDTO =
    {
      "title": "Nueo producto",
      "price": 1000,
      "description": "bla bla bla",
      "categoryId": 1,
      "images": ["https://picsum.photos/640/640?r=6088"]
    }
    this.ProductsService.create(product)
    .subscribe(data => {
      this.products.unshift(data);
    }, error => {
      console.error(error);
    });
  }


  updateProduct(){
    const changes = {
      title: "titulo"
    }

    const id = this.productChosen.id
    this.ProductsService.upDate(id,changes)
    .subscribe(data =>{
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id)
      this.products[productIndex] = data;
      this.productChosen = data;
    });

  }
}
