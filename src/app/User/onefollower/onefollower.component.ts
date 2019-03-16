import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Service/user-services.service';
import { FollowService } from 'src/app/Service/follow-service.service';

@Component({
  selector: 'app-onefollower',
  templateUrl: './onefollower.component.html',
  styleUrls: ['./onefollower.component.css']
})
export class OnefollowerComponent implements OnInit {
  follower;
  constructor(public user: UserService,
    public followService: FollowService) {
      this.user.getOneUser(this.followService.followerId).subscribe(res => {
        this.follower = JSON.parse(res['_body']);
        console.log(JSON.parse(res['_body']))
      });
    }

  ngOnInit() {
  }

}
