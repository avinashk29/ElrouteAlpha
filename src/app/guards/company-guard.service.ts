import { Injectable, Inject } from '@angular/core';
import {CanActivate , Router} from '@angular/router';
import {LOCAL_STORAGE , WebStorageService } from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})

export class CompanyGuardService implements CanActivate {
  companyId;
  constructor(@Inject(LOCAL_STORAGE) public storage: WebStorageService , public router: Router) { }

  canActivate() {
    this.companyId = this.storage.get('companyId');
    if (!this.companyId) {
      this.router.navigate(['/Dashboard']);
      return false;
    } else {
      return true;
    }
  }
}
