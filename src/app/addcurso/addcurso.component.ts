import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { TaskService } from "src/app/services/task.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-addcurso',
  templateUrl: './addcurso.component.html',
  styleUrls: ['./addcurso.component.scss']
})
export class AddcursoComponent implements OnInit {

  project: FormGroup;
  submitted=false;

  constructor(private fBuilder: FormBuilder, private authService: AuthService, private router: Router) {

    this.project = this.fBuilder.group({
      curso: [""],
      grau: [""],
      duracao: [""],
      valor: [""],
      descricao: [""],
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  create() {
    this.submitted = true;
    if (this.project.status === "INVALID") return;
    this.authService.cadCurse(this.project.value).subscribe((response) => {
      this.router.navigate(["/vendas"]);
    });
  }
}
