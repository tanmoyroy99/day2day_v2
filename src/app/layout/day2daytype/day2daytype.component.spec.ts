import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Day2daytypeComponent } from './day2daytype.component';

describe('Day2daytypeComponent', () => {
  let component: Day2daytypeComponent;
  let fixture: ComponentFixture<Day2daytypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Day2daytypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Day2daytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
