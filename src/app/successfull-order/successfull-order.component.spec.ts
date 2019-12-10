import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfullOrderComponent } from './successfull-order.component';

describe('SuccessfullOrderComponent', () => {
  let component: SuccessfullOrderComponent;
  let fixture: ComponentFixture<SuccessfullOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessfullOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfullOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
