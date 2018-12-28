import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-with-login',
  templateUrl: './with-login.component.html',
  styleUrls: ['./with-login.component.css']
})
export class WithLoginComponent implements OnInit {

  constructor() { }
  show = false;
  ngOnInit() {
  }
  onToggle() {
   this.show = !this.show;
   console.log(this.show);
  }
}
