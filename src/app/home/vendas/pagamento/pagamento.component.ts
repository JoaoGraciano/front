import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators  } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { TaskService } from "../../../services/task.service";
import { MatDialog } from '@angular/material/dialog';
import { SelectAlunoComponent } from './selectaluno/selectaluno.component';

export interface PeriodicElement {
  aluno: object;
  valorPago: number;
  curso: Array<any>;
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
export class PagamentoComponent implements OnInit{

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
  data: any;
  aluno: any;

  constructor(private fBuilder: FormBuilder, private authService: AuthService, private router: Router, private taskService: TaskService, fb: FormBuilder, public dialog: MatDialog) {

   this.project = this.fBuilder.group({
      _id:[],
      aluno:null,
      cursos: [],
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
    this.project.get('user')?.patchValue(JSON.parse(localStorage.getItem('user')!));
  }

  // -------------------------------------------------------------------------------------------

  openDialog() {
    const dialogRef = this.dialog.open(SelectAlunoComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.aluno = result;
      this.project.get("aluno")?.patchValue(result)
    });
  }

  addAndRemoveClassRow(row: PeriodicElement, add = true) {
    if (add) {
      row.enabled = true;
      this.valor_total += row.valor;

      this.clickedRows.add(row);
    } else {
      row.enabled = false;
      this.clickedRows.delete(row);
      this.valor_total -= row.valor;
    }
    this.project.patchValue({valor_total: this.valor_total})
    this.project.patchValue({cursos: Array.from(this.clickedRows) })
  }

  selectCourse($event: any) {
    const valorPago = ($event.target as HTMLInputElement).value
    this.selectedCourses = [...this.clickedRows];

    this.troco = parseInt(valorPago) - this.valor_total;
    this.project.patchValue({
      troco: this.troco,
    });
  }

  create() {
    this.authService.venda(this.project.value).subscribe((response) => {
      window.location.reload();
    })
  }

}

