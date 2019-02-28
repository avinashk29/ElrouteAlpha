import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnefollowerComponent } from './onefollower.component';

describe('OnefollowerComponent', () => {
  let component: OnefollowerComponent;
  let fixture: ComponentFixture<OnefollowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnefollowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnefollowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
