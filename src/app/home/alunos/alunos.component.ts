import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { TaskService } from '../../services/task.service';
import { CadAlunoComponent } from './cadalunos/cadalunos.component';
import { InfoAlunoComponent } from './Info-Alunos/info-aluno.component';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.scss'],
})
export class AlunosComponent implements OnInit {
  displayedColumns: string[] = [
    'nome',
    'email',
    'detalhes',
    'editar',
    'deletar',
  ];
  projects: any = [];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<AlunosComponent>(true, []);

  form: FormGroup;
  isUpdated: any;
  submitted = false;

  constructor(
    private fBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private taskService: TaskService,
    private _bottomSheet: MatBottomSheet
  ) {
    this.form = this.fBuilder.group({
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

  deletar(item: any) {
    this.taskService.deleteAluno(item._id).subscribe((res) => {
      window.location.reload();
    },
    (err: any) => console.log(err)
    );
  }

  applyFilter($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.taskService.getAluno().subscribe(
      (res: any) => {
        this.dataSource.data = res.projects;
        this.projects = res.projects;
      },
      (err: any) => console.log(err)
    );
  }

  openInfo(form: any, isUpdated = false) {
    const dialogRef = this.dialog.open(InfoAlunoComponent, {
      width: 'auto',
      data: { ...form, isUpdated },
    });
    dialogRef.afterClosed().subscribe((result) => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  openDialog(form: any, isUpdated = false) {
    const dialogRef = this.dialog.open(CadAlunoComponent, {
      width: 'auto',
      data: { ...form, isUpdated },
    });
    dialogRef.afterClosed().subscribe((result) => {
      //console.log(`Dialog result: ${result}`);
    });
  }
}
