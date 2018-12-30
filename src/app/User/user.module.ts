import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../User/profile/profile.component';
import { FollowersComponent } from '../User/followers/followers.component';
import { FollowingComponent } from '../User/following/following.component';
import { UserOverviewComponent } from '../User/user-overview/user-overview.component';

@NgModule({
  declarations: [ProfileComponent, FollowersComponent, FollowingComponent, UserOverviewComponent],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
