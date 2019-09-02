import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsProgressComponent } from './projects-progress.component';

describe('ProjectsProgressComponent', () => {
  let component: ProjectsProgressComponent;
  let fixture: ComponentFixture<ProjectsProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
