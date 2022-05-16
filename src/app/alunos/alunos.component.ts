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
    this.taskService.deleteUser(item._id).subscribe((res) => {
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

  openInfo(form: any) {
    const dialogRef = this.dialog.open(InfoAlunoComponent, {
      width: 'auto',
      data: {...form}
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

  dataSource = new MatTableDataSource<any>();
  projects:any = [];
  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fBuilder: FormBuilder, private taskService: TaskService) {
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
    } else {
      this.form.reset()
    }
  }

  info(form: any) {
    this.taskService.updateAluno(this.form.value).subscribe((response) => {
      window.location.reload();
      console.log('erro')
    })
  }


}
