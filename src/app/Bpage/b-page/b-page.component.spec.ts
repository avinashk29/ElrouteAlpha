import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BPageComponent } from './b-page.component';

describe('BPageComponent', () => {
  let component: BPageComponent;
  let fixture: ComponentFixture<BPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
