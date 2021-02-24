import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmtptestComponent } from './smtp.component';

describe('SmtptestComponent', () => {
  let component: SmtptestComponent;
  let fixture: ComponentFixture<SmtptestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmtptestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmtptestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
