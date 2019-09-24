import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsProgressDetailsComponent } from './tickets-progress-details.component';

describe('TicketsProgressDetailsComponent', () => {
  let component: TicketsProgressDetailsComponent;
  let fixture: ComponentFixture<TicketsProgressDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsProgressDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsProgressDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
