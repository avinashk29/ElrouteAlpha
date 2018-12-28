import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SPageHeaderSearchComponent } from './s-page-header-search.component';

describe('SPageHeaderSearchComponent', () => {
  let component: SPageHeaderSearchComponent;
  let fixture: ComponentFixture<SPageHeaderSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SPageHeaderSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SPageHeaderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
