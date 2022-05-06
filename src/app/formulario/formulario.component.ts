import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { TaskService } from "../services/task.service";
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  nome: string;
  cidade: number;
  cpf: number;
  idade: string;
  curso: string;
  valor: number;
  user: object;
}


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']

})
export class FormularioComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'cidade', 'cpf', 'idade', 'curso', 'valor'];
  projects:any = [];
  dataSource = new MatTableDataSource<any>();

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {

    this.taskService.getVenda().subscribe(
      (res) => {
        console.log(res);
        this.dataSource.data = res.projects;
        this.projects = res.projects;
        console.log(this.projects);
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

