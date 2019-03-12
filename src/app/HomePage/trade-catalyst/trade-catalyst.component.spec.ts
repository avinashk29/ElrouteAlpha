import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeCatalystComponent } from './trade-catalyst.component';

describe('TradeCatalystComponent', () => {
  let component: TradeCatalystComponent;
  let fixture: ComponentFixture<TradeCatalystComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeCatalystComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeCatalystComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
