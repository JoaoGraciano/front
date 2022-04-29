import { Component, OnInit } from '@angular/core';
import { TaskService } from "../services/task.service";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.scss']
})
export class VendasComponent implements OnInit {

  projects:any = [];
  constructor(private taskService: TaskService, private router: Router) {}

  vendas(){
    this.router.navigate(['/pagamento']);
  }

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

  deletar(item: any) {
    console.log(item._id)
    this.taskService.deleteProject(item._id).subscribe((res) => {
      console.log(res)
    })
  }

}
