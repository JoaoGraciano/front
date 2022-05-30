import { TaskService } from './../../services/task.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';;
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
          console.log(this.data)
  }

  convertToPdf() {
    const element = document.getElementById('pdf');
    console.log(element,'1')
    if (element) {
      html2canvas(element).then(canvas => {
        let pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);
        var width = pdf.internal.pageSize.width;
        var height = canvas.height * (width / canvas.width);
        pdf.addImage(canvas, 'PNG', 0, 0, width, height);
        var options = {
          filename: 'comprovante-de-venda.pdf',
        }
        pdf.output('dataurlnewwindow');
      });
    } else {
      console.log('Deu ruim')
    }
  }
}
