import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';

import { LeadComponent } from '../lead.component';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
})
export class CadastroComponent {
  displayedColumns: string[] = [
    'email',
    'nome',
    'telefone',
    'cidade',
    'encerrar',
    'editar',
    'deletar',
  ];
  projects: any = [];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<LeadComponent>(true, []);

  project: FormGroup;
  submitted = false;
  isUpdated: any;

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CadastroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LeadComponent,
    private fBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.project = this.fBuilder.group({
      _id: [this.data._id],
      email: ['', Validators.email],
      nome: [''],
      telefone: [''],
      cidade: [''],
    });
  }

  ngOnInit(): void {
    //console.log(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createOrUpdate(project: any) {
    this.submitted = true;
    if (!this.data.isUpdated) {
      this.authService.cadContato(this.project.value).subscribe((response) => {
        window.location.reload();
      });
    } else {
      this.taskService.updatelead(this.project.value).subscribe((response) => {
        window.location.reload();
      });
    }
  }
}
