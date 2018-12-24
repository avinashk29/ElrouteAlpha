import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabHeaderComponent } from '../Header/tab-header/tab-header.component';
import { SideNavComponent } from '../Header/side-nav/side-nav.component';

@NgModule({
  declarations: [TabHeaderComponent, SideNavComponent],
  imports: [
    CommonModule
  ]
})
export class HeaderModule { }
