import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { TaskService } from "../services/task.service";
import { Router } from '@angular/router';

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

  delete(){
    
  }

  ngOnInit() {
    this.taskService.getTasks().subscribe(
      (res) => {
        console.log(res);

        this.projects = res.projects;
      },
      (err) => console.log(err)
    );
  }
}
