import { Injectable , Inject} from '@angular/core';
import {CanActivate , Router} from '@angular/router';
import {LOCAL_STORAGE , WebStorageService } from 'angular-webstorage-service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
token;
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService , public router: Router) { }
  canActivate() {
    this.token = this.storage.get('token');
    if (!this.token) {
       this.router.navigate(['/']);
       return false;
    } else {
      return true;
    }

  }
}
