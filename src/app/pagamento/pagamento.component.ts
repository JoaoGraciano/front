import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { TaskService } from "../services/task.service";

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent implements OnInit {


  projects:any = [];
  project: FormGroup;
  submitted=false;
  dataSource = TaskService;

  constructor(private fBuilder: FormBuilder, private authService: AuthService, private router: Router, private taskService: TaskService) {

   this.project = this.fBuilder.group({
      nome: [""],
      cpf:[""],
      cidade: [""],
      idade: [""],
      curso: [""],
      valor: [""],
      user: [""],
    });
  }
  ngOnInit() {
    // const nums = [{value: 10},{value:14}].reduce((acc,num)=>{
    //  return acc+num.value
    // },0)
    // console.log(nums)
    this.projects.get('user').subscibe(JSON.stringify(localStorage.getItem('user')));

    this.taskService.getCadastro().subscribe(
      (res) => {
        console.log(res);

        this.projects = res.projects;
      },
      (err) => console.log(err)
    );
  }



  create() {
    this.submitted = true;
    if (this.project.status === "INVALID") return;

    this.authService.venda(this.project.value).subscribe((response) => {
      this.router.navigate(["/vendas"]);
    });
  }
}
