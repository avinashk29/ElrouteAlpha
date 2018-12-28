import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  heading='NATURAL INDIGO';
  tab1='Dyes';
  tab2='Product';
  model='AB15520';

  products;
  constructor() { 
    this.products = [
			{
				setup: "What did the cheese say when it looked in the mirror?",
        punchline: "Hello-Me (Halloumi)",
      },
      {
				setup: "What did the cheese say when it looked in the mirror?",
        punchline: "Hello-Me (Halloumi)",
      },
      {
				setup: "What did the cheese say when it looked in the mirror?",
        punchline: "Hello-Me (Halloumi)",
      },
      
		];

  }
  panelOpenState = false;


  ngOnInit() {
  }

}
