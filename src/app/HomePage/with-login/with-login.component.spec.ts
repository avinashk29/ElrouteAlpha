import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithLoginComponent } from './with-login.component';

describe('WithLoginComponent', () => {
  let component: WithLoginComponent;
  let fixture: ComponentFixture<WithLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
