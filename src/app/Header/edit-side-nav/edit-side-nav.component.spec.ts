import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSideNavComponent } from './edit-side-nav.component';

describe('EditSideNavComponent', () => {
  let component: EditSideNavComponent;
  let fixture: ComponentFixture<EditSideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
