import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog,  MatDialogRef } from '@angular/material';
import { CatalystService } from 'src/app/Service/catalyst.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trade-catalyst',
  templateUrl: './trade-catalyst.component.html',
  styleUrls: ['./trade-catalyst.component.css']
})
export class TradeCatalystComponent implements OnInit {


  enquiryDetails=new FormGroup({
    name:new FormControl(''),
    mobile:new FormControl('', [Validators.required]),
    email:new FormControl('', [Validators.required , Validators.email]),
     others: new FormControl('')
  });
  showText = false;
  constructor(public dialog: MatDialog,   public dialogRef: MatDialogRef<TradeCatalystComponent>,
     public catalystService: CatalystService, public notification: ToastrService) {


  }

  ngOnInit() {

  }
  onClose(){
    this.dialogRef.close();
  }
  onOthers(val){
    if(val === 'other'){
      this.showText = true;
    } else{
      this.showText = false;
    }
  }
  onSubmit(){
    if (this.enquiryDetails.valid) {
      this.catalystService.onHireCatalyst(this.enquiryDetails.value).subscribe(res => {
        console.log(res);
      });
      // console.log(this.enquiryDetails.value);
      this.notification.success('Hire Request Sent');
      this.dialogRef.close();
    } else {
      this.notification.error('Enter All Details');
    }

  }


}
