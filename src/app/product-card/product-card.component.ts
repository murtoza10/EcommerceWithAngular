import { AppProducts } from './../models/app-products';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product:AppProducts;
  @Input('show-actions') showActions = true;
  constructor() { }

}
