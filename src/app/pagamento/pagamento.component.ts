import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, EmailValidator, Validators  } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { TaskService } from "../services/task.service";
import {SelectionModel} from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



export interface PeriodicElement {
  nome: string;
  // valorPago: number;
  curso: string;
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
      let array = Array.from(this.clickedRows);
      const curso = array;
      row.enabled = true;
      this.valor_total += row.valor;
      console.log(curso)
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
    // console.log(this.form.get('valorPago').value)

    console.log(valorPago)
    this.troco = parseInt(valorPago) - this.valor_total;
    this.project.patchValue({
      troco: this.troco,
    });
  }

  create() {
    this.submitted = true;
    if (this.project.status === "INVALID")
    this.authService.venda(this.project.value).subscribe((response) => {
    });
    console.log(this.project.value,'7')
  }
}


