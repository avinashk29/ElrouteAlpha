import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Service/user-services.service';
import { FollowService } from 'src/app/Service/follow-service.service';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onefollower',
  templateUrl: './onefollower.component.html',
  styleUrls: ['./onefollower.component.css']
})
export class OnefollowerComponent implements OnInit {
  follower;
  constructor(public user: UserService,
    public followService: FollowService,
    public router: Router,
    public dialogRef: MatDialogRef <OnefollowerComponent>
    ) {
     
    }

  ngOnInit() {
  // console.log(this.followService.followerId);
    this.user.getOneUser(this.followService.followerId).subscribe(res => {
    // console.log(res);
      this.follower = JSON.parse(res['_body']);
      console.log(this.follower)
    });
  }
  goToCompany() {
    console.log(this.follower)
    if(this.follower.Company_id)
    {
      this.dialogRef.close();
      this.router.navigate(['/companyPage/'+this.follower.Company_id],{queryParams:{ urltype: 'default'}} )  
    }
    
  }

}
