import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedsSearchComponent } from './feeds.component';

describe('FeedsComponent', () => {
  let component: FeedsSearchComponent;
  let fixture: ComponentFixture<FeedsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
