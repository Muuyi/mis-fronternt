import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsProgressDetailsComponent } from './projects-progress-details.component';

describe('ProjectsProgressDetailsComponent', () => {
  let component: ProjectsProgressDetailsComponent;
  let fixture: ComponentFixture<ProjectsProgressDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsProgressDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsProgressDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
