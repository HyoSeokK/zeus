import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperUserComponent } from './developer-user.component';

describe('DeveloperUserComponent', () => {
  let component: DeveloperUserComponent;
  let fixture: ComponentFixture<DeveloperUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeveloperUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
