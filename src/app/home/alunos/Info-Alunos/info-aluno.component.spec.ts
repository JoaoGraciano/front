import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAlunoComponent } from './info-aluno.component';

describe('InfoAlunoComponent', () => {
  let component: InfoAlunoComponent;
  let fixture: ComponentFixture<InfoAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoAlunoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
