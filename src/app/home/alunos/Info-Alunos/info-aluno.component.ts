import { Component, OnInit, Inject, Input } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormsModule,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { TaskService } from 'src/app/services/task.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CadAlunoComponent } from '../cadalunos/cadalunos.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-infoalunocomponent',
  templateUrl: 'info-aluno.component.html',
})
export class InfoAlunoComponent {
  inputFormControl = new FormControl({ value: null, disabled: true });

  alunos: any = [];
  dataAluno = new MatTableDataSource<any>();
  selection = new SelectionModel<CadAlunoComponent>(true, []);
  dataSource = new MatTableDataSource<any>();
  curso: any = [];

  form: FormGroup;
  submitted = false;
  isUpdated: any;

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<InfoAlunoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fBuilder.group({
      _id: [this.data._id],
      nome: [''],
      idade: [''],
      cpf: [''],
      telefone: [''],
      endereco: [''],
      email: [''],
      cidade: [''],
      estado: [''],
      cep: [''],
      cursos: [''],
    });
  }

  ngOnInit(): void {
    if (this.data?.isUpdated) {
      this.form.get('nome')?.patchValue(this.data.nome);
      this.form.get('idade')?.patchValue(this.data.idade);
      this.form.get('endereco')?.patchValue(this.data.endereco);
      this.form.get('email')?.patchValue(this.data.email);
      this.form.get('cidade')?.patchValue(this.data.cidade);
      this.form.get('telefone')?.patchValue(this.data.telefone);
      this.form.get('cursos')?.patchValue(this.data.cursos);
      this.form.get('cpf')?.patchValue(this.data.cpf);
      this.form.get('estado')?.patchValue(this.data.estado);
      this.form.get('cep')?.patchValue(this.data.cep);
    } else {
      this.form.reset();
    }
  }

  createOrUpdate(form: any) {
    this.submitted = true;
    if (!this.data.isUpdated) {
      this.authService.cadAluno(this.form.value).subscribe((response) => {
        window.location.reload();
      });
    } else {
      this.taskService.updateAluno(this.form.value).subscribe((response) => {
        window.location.reload();
      });
    }
  }
}
