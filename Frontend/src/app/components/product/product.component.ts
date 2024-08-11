import { Component,  Input, Output, EventEmitter } from '@angular/core';
import { Product }from '../../interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent  {

  @Input() product: Product =
    {
      "id": 0 ,
      "title": "Nueo producto",
      "price": 1000,
      "description": "bla bla bla",
      "categoryId": {
        id: 0,
        name: '',
      },
      "images": ["https://picsum.photos/640/640?r=6088"]
    };
  @Input() showProductDetail = false;

  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<number>();

  //ngOnInit(): void {

  //}


  onAddToCart(): void {
    this.addedProduct.emit(this.product);
  }

  onShowDetail(): void {
    this.showProduct.emit(this.product.id);
}
}
