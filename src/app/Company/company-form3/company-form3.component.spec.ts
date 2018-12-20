import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyForm3Component } from './company-form3.component';

describe('CompanyForm3Component', () => {
  let component: CompanyForm3Component;
  let fixture: ComponentFixture<CompanyForm3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyForm3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyForm3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
