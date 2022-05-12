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
  valorPago: number;
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
  troco = 0
  paidValue = 0
  form: any;
  dialog: any;
  isUpdated: any;
  _id: any;



  constructor(private fBuilder: FormBuilder, private authService: AuthService, private router: Router, private taskService: TaskService) {

   this.project = this.fBuilder.group({
      nome: [""],
      cpf:[""],
      cidade: [""],
      idade: [""],
      clickedRows: [""],
      valor_total: [""],
      total_pago: 0,
      troco: 0,
      user: [""],
    });
  }
  ngOnInit() {
    this.taskService.getCadastro().subscribe(
      (res) => {
        console.log(res);

        this.projects = res.projects;
      },
      (err) => console.log(err)
    );
    this.projects.get('user').subscibe(JSON.stringify(localStorage.getItem('user')));
  }
  // ----------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------


  addAndRemoveClassRow(row: PeriodicElement, add = true) {
    console.log(row)
    if (add) {
      row.enabled = true;
      this.valor_total += row.valor;
      this.clickedRows.add(row);
      const set = new Set ([this.clickedRows])
      const array = Array.from(set)
      console.log(array)
      console.log(this.clickedRows,'1')
    } else {
      row.enabled = false;
      this.clickedRows.delete(row);
      this.valor_total -= row.valor;
    }

  }

  calculoTroco() {
    let valor = this.form.get('valor')?.value as number;
    let troco = valor -= this.valor_total;
    this.form.patchValue({
      troco: troco,
    });
    console.log(troco)
  }


  create() {
    this.submitted = true;
    if (this.project.status === "INVALID")
    console.log(this.project,'1')
    console.log(this.project.status,'2')
    console.log(this.valor_total,'3')
     console.log(this.clickedRows,'4')
    this.authService.venda(this.project.value).subscribe((response) => {
    });
  }
}


