import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsProgressComponent } from './meetings-progress.component';

describe('MeetingsProgressComponent', () => {
  let component: MeetingsProgressComponent;
  let fixture: ComponentFixture<MeetingsProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingsProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
