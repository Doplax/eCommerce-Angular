import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product }from '../../interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product!: Product;

  @Output() addedProduct = new EventEmitter<Product>();

  ngOnInit(): void {

  }


  onAddToCart(): void {
    this.addedProduct.emit(this.product);
  }
}
