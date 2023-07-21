import { Product,CreateProductDTO }from '../../interfaces/product.interface';
import { Component } from '@angular/core';
import { switchMap, zip } from 'rxjs';
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

  limit = 10
  offset = 0
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor (
    private storeService: StoreService,
    private ProductsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit () {
    // Ponemos esto aqui en vez de el constructor, ya que se trata de una peticion asincrona
    this.ProductsService.getProductsByPage(this.limit,this.offset)
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
    this.statusDetail = 'loading'
    this.ProductsService.getProduct(id)
      .subscribe(data => {
        this.toggleProductDetail()
        this.productChosen = data;
        this.statusDetail = 'success'
      },errorMsg =>{
        console.error(errorMsg);
        window.alert(errorMsg)
        this.statusDetail = 'error'
      })
  }

  //readAndUpdate(id: number){
  //  this.ProductsService.getProduct(id)
  //  .pipe(
  //    switchMap((product) => this.ProductsService.upDate(product.id, {title: 'change'}))
  //    )
  //    .subscribe(data => {
  //      console.log(data)
  //    });
  //    this.ProductsService.fetchReadAndUpdate(id,{title: 'change'}).subscribe(response => {
  //      const read = response[0]
  //      const update = response[1]
  //    })


  //}

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

  deleteProduct() {
    this.ProductsService.delete(this.productChosen.id)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id)
      this.products[productIndex] = data;
      this.products.splice(productIndex,1)
      this.toggleProductDetail();
    })

  }

  loadMore() {
    this.ProductsService.getProductsByPage(this.limit,this.offset)
    .subscribe(data => {
      this.products = [...this.products, ...data];
      //this.products = this.products.concat(data); // Para no sobrescribir, lo concatenamos, pero concat es para arrays inmutables (no modifica el array original) por eso hacemos una reasignación
      this.offset += this.limit;
    })
  }


}
