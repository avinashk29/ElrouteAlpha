import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanProfileComponent } from './compan-profile.component';

describe('CompanProfileComponent', () => {
  let component: CompanProfileComponent;
  let fixture: ComponentFixture<CompanProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
