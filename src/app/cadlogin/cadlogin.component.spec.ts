import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadloginComponent } from './cadlogin.component';

describe('CadloginComponent', () => {
  let component: CadloginComponent;
  let fixture: ComponentFixture<CadloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
