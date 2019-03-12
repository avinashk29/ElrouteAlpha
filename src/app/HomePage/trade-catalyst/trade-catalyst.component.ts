import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-trade-catalyst',
  templateUrl: './trade-catalyst.component.html',
  styleUrls: ['./trade-catalyst.component.css']
})
export class TradeCatalystComponent implements OnInit {

  enquiryDetails=new FormGroup({
    name:new FormControl(''),
    phone:new FormControl(''),
    email:new FormControl(''),

  })
  constructor() { }

  ngOnInit() {
  }
  onSubmit(){
    
  }
}
