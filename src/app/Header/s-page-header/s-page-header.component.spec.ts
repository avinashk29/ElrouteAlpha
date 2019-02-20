import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SPageHeaderComponent } from './s-page-header.component';

describe('SPageHeaderComponent', () => {
  let component: SPageHeaderComponent;
  let fixture: ComponentFixture<SPageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SPageHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
