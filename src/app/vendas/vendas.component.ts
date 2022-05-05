import { Component, OnInit } from '@angular/core';
import { TaskService } from "../services/task.service";
import { ActivatedRoute, Router } from "@angular/router";
import { animate, state, style, transition, trigger } from '@angular/animations';


export interface PeriodicElement {
  curso: string;
  grau: string;
  duracao: number;
  valor: number;
  descricao: string;
}

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class VendasComponent implements OnInit {

  displayedColumns: string[] = ['curso', 'grau', 'duracao', 'valor'];
  dataSource = TaskService;
  projects:any = [];
  constructor(private taskService: TaskService, private router: Router) {}


  ngOnInit() {

    this.taskService.getTasks().subscribe(
      (res: any) => {
        console.log(res);
        this.projects = res.projects;
        console.log(this.projects);
      },
      (err) => console.log(err)
    );
  }

  vendas(project: any) {
    console.log(project)
    this.taskService.getDadosCurso(project);

    this.router.navigate(['/pagamento']);
  }

  deletar(item: any) {
    console.log(item._id)
    this.taskService.deleteProject(item._id).subscribe((res) => {
      console.log(res)
      this.router.navigate(['/vendas']);
    })
  }

  update(project: any) {
    console.log(project)
    this.taskService.getUpdate(project);

    this.router.navigate(['/addcurso']);
  }

}
