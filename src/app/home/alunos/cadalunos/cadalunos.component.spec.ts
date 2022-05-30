import { CadAlunoComponent } from './cadalunos.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('CadAlunoComponent', () => {
  let component: CadAlunoComponent;
  let fixture: ComponentFixture<CadAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadAlunoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
