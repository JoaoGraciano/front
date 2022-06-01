import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

import { VendasComponent } from '../vendas.component';

@Component({
  selector: 'app-editvendas',
  templateUrl: './editvendas.component.html',
})
export class EditvendasComponent {
  displayedColumns: string[] = [
    'curso',
    'grau',
    'duracao',
    'valor',
    'descricao',
  ];

  projects: any = [];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<EditvendasComponent>(true, []);

  form: FormGroup;
  submitted = false;
  isUpdated: any;
  authService: any;

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<VendasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.fBuilder.group({
      _id: [this.data._id],
      curso: [''],
      grau: [''],
      duracao: [''],
      valor: [''],
      descricao: [''],
    });
  }

  ngOnInit(): void {
    if (this.data?.isUpdated) {
      //console.log(this.data,'1111')
      this.form.get('curso')?.patchValue(this.data.curso);
      this.form.get('grau')?.patchValue(this.data.grau);
      this.form.get('duracao')?.patchValue(this.data.duracao);
      this.form.get('valor')?.patchValue(this.data.valor);
      this.form.get('descricao')?.patchValue(this.data.curso);
    } else {
      this.form.reset();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createOrUpdate(project: any) {
    this.submitted = true;
    if (!this.data.isUpdated) {
      this.authService.cadCurse(this.form.value).subscribe(() => {
        window.location.reload();
      });
    } else {
      this.taskService.updateCurso(this.form.value).subscribe((response) => {
        window.location.reload();
      });
    }
  }
}
