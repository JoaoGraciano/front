import { CursosComponent } from './../cursos.component';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, EmailValidator, Validators } from '@angular/forms';
import { AuthService } from "src/app/services/auth.service";

export interface PeriodicElement {
  curso: string,
  grau: string,
  duracao: number,
  valor: number,
  descricao: string,
}

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.scss']
})
export class CursodetalheComponent {

  displayedColumns: string[] = ['curso', 'grau', 'duracao', 'valor', 'descricao'];
  projects:any = [];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<CursosComponent>(true, []);

  project: FormGroup;
  submitted=false;
  isUpdated: any;

  constructor(private taskService: TaskService, public dialog: MatDialog, public dialogRef: MatDialogRef<CursodetalheComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fBuilder: FormBuilder,
  private authService: AuthService, private router: Router) {
    this.project = this.fBuilder.group({
      _id:[this.data.id],
      curso: [""],
      grau: [""],
      duracao: [""],
      valor: [""],
      descricao: [""],
    });

  }

  ngOnInit(): void {

    console.log(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createOrUpdate(project: any) {
    this.submitted = true
    if (!this.data.isUpdated) {
      this.authService.cadContato(this.project.value).subscribe((response) => {
        window.location.reload();
      })

    } else {
      this.taskService.updatelead(this.project.value).subscribe((response)  => {
        window.location.reload();
      })
}
  }
}
