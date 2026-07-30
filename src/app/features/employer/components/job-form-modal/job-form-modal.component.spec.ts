import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobFormModalComponent } from './job-form-modal.component';

describe('JobFormModalComponent', () => {
  let component: JobFormModalComponent;
  let fixture: ComponentFixture<JobFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobFormModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
