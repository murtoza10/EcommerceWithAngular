import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {
  @Input('totalitemcount') totalItemCount:number;
  @Input('items') items;
  @Input('totalprice') TotalPrice:number;
  constructor() { }

  ngOnInit() {
  }

}
