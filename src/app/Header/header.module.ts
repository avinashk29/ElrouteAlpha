import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabHeaderComponent } from '../Header/tab-header/tab-header.component';
import { SideNavComponent } from '../Header/side-nav/side-nav.component';
import { SPageHeaderComponent } from './s-page-header/s-page-header.component';
import { SPageHeaderSearchComponent } from '../Header/s-page-header-search/s-page-header-search.component';
import { Header3Component } from '../Header/header3/header3.component';

@NgModule({
  declarations: [TabHeaderComponent, SideNavComponent, SPageHeaderComponent, SPageHeaderSearchComponent, Header3Component],
  imports: [
    CommonModule
  ]
})
export class HeaderModule { }
