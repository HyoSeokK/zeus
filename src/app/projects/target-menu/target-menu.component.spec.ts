import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetMenuComponent } from './target-menu.component';

describe('TargetMenuComponent', () => {
  let component: TargetMenuComponent;
  let fixture: ComponentFixture<TargetMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
