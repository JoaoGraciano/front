import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, EmailValidator, Validators  } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { TaskService } from "../services/task.service";
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

export interface PeriodicElement {
  nome: string;
  valorPago: number;
  curso: Array<any>;
  email: string;
  valor: number;
  enabled: boolean;
  clickedrows: string;
  valor_total: number;
}

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  displayedColumns: string[] = ['curso', 'valor'];
  projects:any = [];
  project: FormGroup;
  dataSource = TaskService;
  submitted = false;
  clickedRows = new Set<PeriodicElement>();
  valor_total = 0;
  disableSelect = new FormControl(false);
  troco = 0;
  valorPago = 0;
  form: any;
  isUpdated: any;
  _id: any;
  selectedCourses: PeriodicElement[] = [];
  subtotal = 0;
  FormGroup: FormGroup;

  constructor(private fBuilder: FormBuilder, private authService: AuthService, private router: Router, private taskService: TaskService, fb: FormBuilder, public dialog: MatDialog) {

    this.FormGroup = fb.group({
      curso: false,
      nome: false,
      cidade: false,
    });

   this.project = this.fBuilder.group({
      nome: [""],
      cpf:[""],
      cidade: [""],
      idade: [""],
      cursos: [],
      email: [""],
      valor_total: [""],
      valorPago: [""],
      troco: [""],
      user: [""],
    });
  }
  ngOnInit() {
    this.taskService.getCadastro().subscribe(
      (res) => {
        this.projects = res.projects;
      },
      (err) => console.log(err)
    );
    this.projects.get('user').subscibe(JSON.stringify(localStorage.getItem('user')));
  }
  // ----------------------------------------------------------------------------------------

  openDialog() {
    const dialogRef = this.dialog.open(SelectAlunoComponent);

  }
  addAndRemoveClassRow(row: PeriodicElement, add = true) {
    console.log(row)
    if (add) {
      row.enabled = true;
      console.log(this.clickedRows)
      this.valor_total += row.valor;

      this.clickedRows.add(row);
    } else {
      row.enabled = false;
      this.clickedRows.delete(row);
      this.valor_total -= row.valor;
    }
    console.log(Array.from(this.clickedRows) )
    this.project.patchValue({valor_total: this.valor_total})
    this.project.patchValue({cursos: Array.from(this.clickedRows) })

  }

  selectCourse($event: any) {
    const valorPago = ($event.target as HTMLInputElement).value
    this.selectedCourses = [...this.clickedRows];

    console.log(valorPago)
    this.troco = parseInt(valorPago) - this.valor_total;
    this.project.patchValue({
      troco: this.troco,
    });
  }

  create() {
    if (this.submitted = true)
    this.authService.venda(this.project.value).subscribe((response) => {
      // window.location.reload();
    })
  }
}


@Component({
  selector: 'app-selectaluno',
  templateUrl: './selectaluno.component.html',

})
export class SelectAlunoComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'cpf'];
  projects:any = [];
  dataSource = new MatTableDataSource<any>();
  
  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {

    this.taskService.getAluno().subscribe(
      (res) => {
        this.projects = res.projects;
      },
      (err) => console.log(err)
    );
  }
}
