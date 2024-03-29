import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CadAlunoComponent } from 'src/app/home/alunos/cadalunos/cadalunos.component';
import { TaskService } from 'src/app/services/task.service';

import { PeriodicElement } from '../pagamento.component';

@Component({
  selector: 'app-selectaluno',
  templateUrl: './selectaluno.component.html',
})
export class SelectAlunoComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'cpf'];
  projects: any = [];
  dataSource = new MatTableDataSource<any>();
  form: any;
  clickedRows = new Set<PeriodicElement>();
  row: any;

  constructor(
    private taskService: TaskService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SelectAlunoComponent>
  ) {}

  applyFilter($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.taskService.getAluno().subscribe(
      (res) => {
        this.dataSource.data = res.projects;
        this.projects = res.projects;
      },
      (err) => console.log(err)
    );
  }

  openDialog(form: any, isUpdated = false) {
    const dialogRef = this.dialog.open(CadAlunoComponent, {
      width: 'auto',
      data: { ...form, isUpdated },
    });
  }
}
