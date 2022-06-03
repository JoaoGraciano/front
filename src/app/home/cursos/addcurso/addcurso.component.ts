import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-addcurso',
  templateUrl: './addcurso.component.html',
  styleUrls: ['./addcurso.component.scss'],
})
export class AddcursoComponent implements OnInit {
  project: FormGroup;
  submitted = false;

  constructor(
    private fBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.project = this.fBuilder.group({
      curso: [''],
      grau: [''],
      duracao: [''],
      valor: [''],
      descricao: [''],
    });
  }
  ngOnInit(): void {}

  create() {
    this.submitted = true;
    if (this.project.status === 'INVALID') return;
    this.authService.cadCurse(this.project.value).subscribe((response) => {
      this.router.navigate(['/vendas'])
    },
    (err: any) => console.log(err));
  }
}
