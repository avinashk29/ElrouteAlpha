import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedShareComponent } from './feed-share.component';

describe('FeedShareComponent', () => {
  let component: FeedShareComponent;
  let fixture: ComponentFixture<FeedShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
