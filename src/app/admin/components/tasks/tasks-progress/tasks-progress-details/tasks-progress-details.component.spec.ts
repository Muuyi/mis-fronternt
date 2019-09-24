import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksProgressDetailsComponent } from './tasks-progress-details.component';

describe('TasksProgressDetailsComponent', () => {
  let component: TasksProgressDetailsComponent;
  let fixture: ComponentFixture<TasksProgressDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksProgressDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksProgressDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
