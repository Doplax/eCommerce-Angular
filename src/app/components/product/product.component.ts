import { Component,  Input, Output, EventEmitter } from '@angular/core';
import { Product }from '../../interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent  {

  @Input() product!: Product;
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
