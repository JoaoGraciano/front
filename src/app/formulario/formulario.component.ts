import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { TaskService } from "../services/task.service";
import { Router } from '@angular/router';

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

  displayedColumns: string[] = ['nome', 'cidade', 'cpf', 'idade', 'curso', 'valor', 'user'];
  projects:any = [];
  dataSource = TaskService;
  search : String ="";
  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {

    this.taskService.getVenda().subscribe(
      (res) => {
        console.log(res);

        this.projects = res.projects;
      },
      (err) => console.log(err)
    );

  }
}

