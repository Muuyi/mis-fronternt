import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsProgressComponent } from './tickets-progress.component';

describe('TicketsProgressComponent', () => {
  let component: TicketsProgressComponent;
  let fixture: ComponentFixture<TicketsProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
