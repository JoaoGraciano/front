import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

import { TaskService } from "../services/task.service";
import {SelectionModel} from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CadAlunoComponent } from '../cadalunos/cadalunos.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';


@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.scss']
})
export class AlunosComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'email', 'detalhes', 'editar', 'deletar'];
  projects:any = [];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<AlunosComponent>(true, []);

  form: FormGroup;
  isUpdated: any;
  submitted=false;

  constructor(private fBuilder: FormBuilder, private authService: AuthService, private router: Router, public dialog: MatDialog, private taskService: TaskService, private _bottomSheet: MatBottomSheet) {

    this.form = this.fBuilder.group({
      nome: [""],
      idade: [""],
      cpf: [""],
      telefone: [""],
      endereco: [""],
      email: [""],
      cidade: [""],
      estado: [""],
      cep: [""],
      cursos: [""],
    });
  }

  deletar(item: any) {
    this.taskService.deleteAluno(item._id).subscribe((res) => {
      window.location.reload();
    })
  }

  applyFilter($event: Event){
    console.log($event,'1')
    const filterValue = ($event.target as HTMLInputElement).value;
    console.log(filterValue,'2');
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.taskService.getAluno().subscribe(
      (res:any) => {
        this.dataSource.data = res.projects;
        this.projects = res.projects;
    },
    (err: any) => console.log(err)
  );
  }

  openInfo(form: any, isUpdated = false) {
    const dialogRef = this.dialog.open(InfoAlunoComponent, {
      width: 'auto',
      data: {...form, isUpdated}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialog(form: any, isUpdated = false) {
    const dialogRef = this.dialog.open(CadAlunoComponent, {
      width: 'auto',
      data: {...form, isUpdated}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}



@Component({
  selector: 'app-infoalunocomponent',
  templateUrl: 'InfoAluno.component.html',
})
export class InfoAlunoComponent {

  alunos:any = [];
  dataAluno = new MatTableDataSource<any>();
  selection = new SelectionModel<CadAlunoComponent>(true, []);

  form: FormGroup;
  submitted=false;
  isUpdated: any;


  constructor(private taskService: TaskService, public dialog: MatDialog, public dialogRef: MatDialogRef<InfoAlunoComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fBuilder: FormBuilder,
  private authService: AuthService, private router: Router) {
    this.form = this.fBuilder.group({
      _id:[this.data._id],
      nome: [""],
      idade: [""],
      cpf: [""],
      telefone: [""],
      endereco: [""],
      email: [""],
      cidade: [""],
      estado: [""],
      cep: [""],
      cursos: [""],
    });
  }


  ngOnInit(): void {
    if (this.data?.isUpdated) {
      this.form.get("nome")?.patchValue(this.data.nome)
      this.form.get("idade")?.patchValue(this.data.idade)
      this.form.get("endereco")?.patchValue(this.data.endereco)
      this.form.get("email")?.patchValue(this.data.email)
      this.form.get("cidade")?.patchValue(this.data.cidade)
      this.form.get("telefone")?.patchValue(this.data.telefone)
      this.form.get("cursos")?.patchValue(this.data.cursos)
      this.form.get("cpf")?.patchValue(this.data.cpf)
      this.form.get("estado")?.patchValue(this.data.estado)
      this.form.get("cep")?.patchValue(this.data.cep)
    } else {
      this.form.reset()
    }
  }

  createOrUpdate(form: any) {
    this.submitted = true
    if (!this.data.isUpdated) {
        this.authService.cadAluno(this.form.value).subscribe((response) => {
          window.location.reload();
      })
    } else {
      this.taskService.updateAluno(this.form.value).subscribe((response) => {
        window.location.reload();
      })
}
}

}
