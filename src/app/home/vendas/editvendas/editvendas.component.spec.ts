import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditvendasComponent } from './editvendas.component';

describe('EditvendasComponent', () => {
  let component: EditvendasComponent;
  let fixture: ComponentFixture<EditvendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditvendasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditvendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
