import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyForm5Component } from './company-form5.component';

describe('CompanyForm5Component', () => {
  let component: CompanyForm5Component;
  let fixture: ComponentFixture<CompanyForm5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyForm5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyForm5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
