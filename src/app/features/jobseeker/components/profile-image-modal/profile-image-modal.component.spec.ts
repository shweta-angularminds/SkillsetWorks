import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileImageModalComponent } from './profile-image-modal.component';

describe('ProfileImageModalComponent', () => {
  let component: ProfileImageModalComponent;
  let fixture: ComponentFixture<ProfileImageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileImageModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileImageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
