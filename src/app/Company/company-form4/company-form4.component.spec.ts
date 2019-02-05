import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyForm4Component } from './company-form4.component';

describe('CompanyForm4Component', () => {
  let component: CompanyForm4Component;
  let fixture: ComponentFixture<CompanyForm4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyForm4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyForm4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
