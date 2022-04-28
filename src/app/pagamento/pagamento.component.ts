import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";


@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent implements OnInit {

  projects:any = [];
  project: FormGroup;
  submitted=false;

  constructor(private fBuilder: FormBuilder, private authService: AuthService, private router: Router) {

   this.project = this.fBuilder.group({
      nome: [""],
      cpf:[""],
      cidade: [""],
      idade: [""],
      curso: [""],
      valor: [""],
      user: [""],
      email: [""],
    });
  }
  ngOnInit(): void {
    this.projects.get('user').val(JSON.stringify(localStorage.getItem('user')));
  }



  create() {
    this.submitted = true;
    if (this.project.status === "INVALID") return;


    this.authService.venda(this.project.value).subscribe((response) => {
      this.router.navigate(["/vendas"]);
    });
  }
}
