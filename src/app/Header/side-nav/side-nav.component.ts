import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor() { }
toggle = false;
  ngOnInit() {
  }
  onToggle() {
this.toggle = !this.toggle;
console.log(this.toggle);
  }
}
