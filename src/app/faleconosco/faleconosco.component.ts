import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: 'app-faleconosco',
  templateUrl: './faleconosco.component.html',
  styleUrls: ['./faleconosco.component.scss']
})
export class FaleconoscoComponent implements OnInit {

  project: FormGroup;
  submitted=false;
  

  constructor(private fBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.project = this.fBuilder.group({
      email: [""],
      nome: [""],
      telefone: [""],
      cidade: [""],
    });
  }

  ngOnInit(): void {
  }

  createOrUpdate() {
    this.submitted = true;
    if (this.project.status === "INVALID") return;
    this.authService.cadContato(this.project.value).subscribe((response) => {
      this.router.navigate(["/"]);
    });
  }

}
