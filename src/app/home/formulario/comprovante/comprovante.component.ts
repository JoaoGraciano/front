import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-comprovante',
  templateUrl: './comprovante.component.html',
  styleUrls: ['./comprovante.component.scss'],
})
export class ComprovanteComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  projects: any = [];
  form: any;
  selected: any;
  Router: any;

  constructor(
    public taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fBuilder: FormBuilder
  ) {
    this.form = this.fBuilder.group({
      _id: [this.data._id],
      aluno: null,
      cursos: [],
      valor_total: [''],
      valorPago: [''],
      troco: [''],
      user: [''],
    });
  }

  ngOnInit(): void {
    this.taskService.getVenda().subscribe(
      (res) => {
        this.dataSource.data = res.projects;
        this.projects = res.projects;
      },
      (err) => console.log(err)
    );
  }
}
