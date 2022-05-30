import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators  } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { TaskService } from "../../../services/task.service";
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CadAlunoComponent } from '../../alunos/cadalunos/cadalunos.component';

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
  nome: any;

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

  // ------------------------------------------------------------------------------------------------------------------------------

  openDialog() {
    const dialogRef = this.dialog.open(SelectAlunoComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.aluno = result;
      this.project.get("aluno")?.patchValue(result)
      console.log(this.project);
    });
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
    console.log(this.clickedRows)
    console.log(this.aluno)
    // return console.log(this.project)
    this.authService.venda(this.project.value).subscribe((response) => {
      window.location.reload();
    })

    // var objeto = {
    //   aluno:{},
    //   cursos: [],
    // }
    // buscou seu usuario, baseado no token dele
    // objeto.usuario = usuaio_do_banco
    // salva o objeto
    // this.authService.venda({
    //   cursos: Array.from(this.clickedRows!),
    //   aluno: this.project.get("aluno")?.value,
    //   user: this.project.get("user")?.value,
    //   venda: this.project.get("valorPago,valor_total, troco")?.value,
    // }!).subscribe((response) => {
    //   console.log(response)
    // })
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
  form: any;
  clickedRows = new Set<PeriodicElement>();
  row: any;

  constructor(private taskService: TaskService, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public dialogRef: MatDialogRef<SelectAlunoComponent>) {}

  applyFilter($event: Event){
    console.log($event,'1')
    const filterValue = ($event.target as HTMLInputElement).value;
    console.log(filterValue,'2');
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.taskService.getAluno().subscribe(
      (res) => {
        console.log(res);
        this.dataSource.data = res.projects;
        this.projects = res.projects;
        console.log(this.projects);
      },
      (err) => console.log(err)
    );
  }

  openDialog(form: any, isUpdated = false) {
    const dialogRef = this.dialog.open(CadAlunoComponent, {
      width: 'auto',
      data: {...form, isUpdated}
    });
  }
}
