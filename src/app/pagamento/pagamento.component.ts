import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { TaskService } from "../services/task.service";

export interface PeriodicElement {
  valorPago: number;
  curso: string;
  valor: number;
  enabled: boolean;
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
  clickedRows = new Set<PeriodicElement>();
  valor_total = 0
  disableSelect = new FormControl(false);
  troco = 0
  paidValue = 0
  form: any;

  constructor(private fBuilder: FormBuilder, private authService: AuthService, private router: Router, private taskService: TaskService) {

   this.project = this.fBuilder.group({
      nome: [""],
      cpf:[""],
      cidade: [""],
      idade: [""],
      curso: [""],
      valor: 0,
      total_pago: 0,
      troco: 0,
      user: [""],
    });
  }
  ngOnInit() {
    // const nums = [{value: 10},{value:14}].reduce((acc,num)=>{
    //  return acc+num.value
    // },0)
    // console.log(nums)
    // this.projects.get('user').subscibe(JSON.stringify(localStorage.getItem('user')));
    this.taskService.getCadastro().subscribe(
      (res) => {
        console.log(res);

        this.projects = res.projects;
      },
      (err) => console.log(err)
    );
  }



  // create() {
  //   this.submitted = true;
  //   if (this.project.status === "INVALID") return;

  //   this.authService.venda(this.project.value).subscribe((response) => {
  //     this.router.navigate(["/vendas"]);
  //   });
  // }


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
    } else {
      row.enabled = false;
      this.clickedRows.delete(row);
      this.valor_total -= row.valor;
    }
  }
  calculoTroco() {
    let paidValue = this.form.get('paidValue')?.value as number;
    let troco = paidValue - this.troco;
    this.form.patchValue({
      troco: troco,
    });
    console.log(troco)
  }
}
