import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service'

import { Product } from '../../interfaces/product.interface';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  limit = 10
  offset = 0

  constructor (
    private productsService: ProductsService
  ){}

  ngOnInit(): void {
    this.productsService.getProductsByPage(this.limit,this.offset)
      .subscribe(data => {this.products = data})
  }




  
}
