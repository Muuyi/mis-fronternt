import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsProgressDetailsComponent } from './meetings-progress-details.component';

describe('MeetingsProgressDetailsComponent', () => {
  let component: MeetingsProgressDetailsComponent;
  let fixture: ComponentFixture<MeetingsProgressDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingsProgressDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsProgressDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
