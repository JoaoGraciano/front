import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { TaskService } from "../services/task.service";
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface PeriodicElement {
  nome: string;
  cidade: number;
  cpf: number;
  idade: string;
  curso: string;
  aluno: Array<any>;
  valor: number;
  user: object;
  createdAt: number;
}

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']

})
export class FormularioComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'cidade', 'cpf', 'idade', 'curso', 'valor', 'user','createdAt'];
  projects:any = [];
  dataSource = new MatTableDataSource<any>();
  project: FormGroup;

  constructor(private taskService: TaskService, private router: Router, private fBuilder: FormBuilder) {

    this.project = this.fBuilder.group({
      aluno:null,
      cursos: [],
      valor_total: [""],
      valorPago: [""],
      troco: [""],
      user: [""],
      nome: [""],
    });
  }

  ngOnInit() {

    this.taskService.getVenda().subscribe(
      (res) => {
        console.log(res,'1');
        console.log(this.dataSource,'2')
        this.dataSource.data = res.projects;
        this.projects = res.projects;
        console.log(this.projects,'3');
      },
      (err) => console.log(err)
    );
  }

  applyFilter($event: Event){
    console.log($event,'1')
    const filterValue = ($event.target as HTMLInputElement).value;
    console.log(filterValue,'2');
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
