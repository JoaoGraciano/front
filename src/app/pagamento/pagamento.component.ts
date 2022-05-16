import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, EmailValidator, Validators  } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { TaskService } from "../services/task.service";



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
  valor_total = 0
  disableSelect = new FormControl(false);
  troco = 0;
  valorPago = 0;
  form: any;
  dialog: any;
  isUpdated: any;
  _id: any;
  selectedCourses: PeriodicElement[] = [];
  subtotal = 0;



  constructor(private fBuilder: FormBuilder, private authService: AuthService, private router: Router, private taskService: TaskService) {

   this.project = this.fBuilder.group({
      nome: [""],
      cpf:[""],
      cidade: [""],
      idade: [""],
      cursos: [""],
      email: [""],
      valor_total: [""],
      valorPago: [""],
      troco: [""],
      user: [""],
    });
    // this.form = new FormGroup({
    //   valorPago: new FormControl({ value: 0 }),
    //   troco: new FormControl({ value: 0, disabled: true }),
    // });
  }
  ngOnInit() {
    this.taskService.getCadastro().subscribe(
      (res) => {
        // console.log(res);
        this.projects = res.projects;
      },
      (err) => console.log(err)
    );
    this.projects.get('user').subscibe(JSON.stringify(localStorage.getItem('user')));
  }
  // ----------------------------------------------------------------------------------------

  addAndRemoveClassRow(row: PeriodicElement, add = true) {
    console.log(row)
    if (add) {
      // let array = Array.from(this.clickedRows);
      // var curso = array;
      const set = new Set (['cursos']);
      Array.from(set);
      console.log(set)
      row.enabled = true;
      console.log(this.clickedRows)
      this.valor_total += row.valor;

      this.clickedRows.add(row);
    } else {
      row.enabled = false;
      this.clickedRows.delete(row);
      this.valor_total -= row.valor;
    }
    this.project.patchValue({valor_total: this.valor_total})
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


