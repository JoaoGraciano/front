import { ComponentFixture, TestBed } from '@angular/core/testing';

import { cadastrologin } from './cadastrologin.component';

describe('CadastrologinComponent', () => {
  let component: cadastrologin;
  let fixture: ComponentFixture<cadastrologin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ cadastrologin ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(cadastrologin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
