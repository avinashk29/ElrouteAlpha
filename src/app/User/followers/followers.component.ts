import { Component, OnInit , Inject} from '@angular/core';
import { CompanyServiceService } from 'src/app/Service/company-service.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service'
import { MatDialog, MatDialogConfig } from '@angular/material';
import { OnefollowerComponent } from '../onefollower/onefollower.component';
import { FollowService } from 'src/app/Service/follow-service.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  constructor( private companyService: CompanyServiceService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    public dialog: MatDialog,
    public followService: FollowService) { }
followers = [];
  ngOnInit() {
    this.companyService.token = this.storage.get('token');
    this.companyService.getCompanyFollowers().subscribe(res => {
      console.log(JSON.parse(res['_body']));
      this.followers = JSON.parse(res['_body']);
    });
  }
  Openpopup(id) {
    this.followService.followerId = id;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    console.log(id);
    this.dialog.open(OnefollowerComponent, dialogConfig);

  }
}
