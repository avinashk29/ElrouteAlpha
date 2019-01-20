import { Component, OnInit , Inject} from '@angular/core';
import {LOCAL_STORAGE , WebStorageService} from 'angular-webstorage-service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor( ) { }

  ngOnInit() {
  }

}
