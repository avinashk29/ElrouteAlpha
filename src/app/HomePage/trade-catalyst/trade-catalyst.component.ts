import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog,  MatDialogRef } from '@angular/material';

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
  showText = false;
  constructor(public dialog: MatDialog,   public dialogRef: MatDialogRef<TradeCatalystComponent>) {  
    
    
  }

  ngOnInit() {
  }
  onClose(){
    this.dialogRef.close();
  }
  onOthers(val){
    if(val === 'other'){
      this.showText = true;
    }
    else{
      this.showText = false;
    }
  }
  onSubmit(){
  
    
  }

  
}
