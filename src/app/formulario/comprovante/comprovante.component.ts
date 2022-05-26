import { TaskService } from './../../services/task.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';;
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-comprovante',
  templateUrl: './comprovante.component.html',
  styleUrls: ['./comprovante.component.scss']
})
export class ComprovanteComponent implements OnInit {

  dataSource = new MatTableDataSource<any>();
  projects: any = [];
  form: any;
  selected: any;

  constructor(public taskService: TaskService, @Inject(MAT_DIALOG_DATA) public data: any, private fBuilder: FormBuilder) {
    this.form = this.fBuilder.group({
      _id:[this.data._id],
      aluno: null,
      cursos: [],
      valor_total: [''],
      valorPago: [''],
      troco: [''],
      user: [''],
    });
  }

  ngOnInit(): void {
        // console.log(this.data)
        this.taskService.getVenda().subscribe(
          (res) => {
            this.dataSource.data = res.projects;
            this.projects = res.projects;
          },
          (err) => console.log(err)
        );
        console.log(this.dataSource,'1')
        console.log(this.projects,'2')
        console.log(this.data,'3')
  }
}
