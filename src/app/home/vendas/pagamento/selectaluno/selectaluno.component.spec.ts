import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectalunoComponent } from './selectaluno.component';

describe('SelectalunoComponent', () => {
  let component: SelectalunoComponent;
  let fixture: ComponentFixture<SelectalunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectalunoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectalunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
