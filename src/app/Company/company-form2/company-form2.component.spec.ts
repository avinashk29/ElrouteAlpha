import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyForm2Component } from './company-form2.component';

describe('CompanyForm2Component', () => {
  let component: CompanyForm2Component;
  let fixture: ComponentFixture<CompanyForm2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyForm2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyForm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
