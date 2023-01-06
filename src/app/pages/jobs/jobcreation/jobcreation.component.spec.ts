import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobcreationComponent } from './jobcreation.component';

describe('JobcreationComponent', () => {
  let component: JobcreationComponent;
  let fixture: ComponentFixture<JobcreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobcreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobcreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
