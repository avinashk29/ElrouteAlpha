import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanEditComponent } from './compan-edit.component';

describe('CompanEditComponent', () => {
  let component: CompanEditComponent;
  let fixture: ComponentFixture<CompanEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
