import { Router } from '@angular/router';
import { TaskService } from './../../services/task.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';;
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import  html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
  Router: any;

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
        this.taskService.getVenda().subscribe(
          (res) => {
            this.dataSource.data = res.projects;
            this.projects = res.projects;
          },
          (err) => console.log(err)
        );

  }

  convertToPdf() {
    console.log('1')
    const element = document.getElementById('comprovante');
    console.log('1')
    if (element) {
      console.log('1')
      html2canvas(element).then(canvas => {
        console.log('1')
        let pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);
        console.log('1')
        var width = pdf.internal.pageSize.width;
        console.log('1')
        var height = canvas.height * (width / canvas.width);
        console.log('1')
        pdf.addImage(canvas, 'PNG', 0, 0, width, height);
        // pdf.save('test.pdf');
        console.log('1')
        var options = {
          filename: 'comprovante-de-venda.pdf',
        }
        console.log('1')
        pdf.output('dataurlnewwindow');
      });
    }
  }

}
