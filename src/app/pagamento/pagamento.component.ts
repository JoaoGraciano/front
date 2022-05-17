import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, EmailValidator, Validators  } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { TaskService } from "../services/task.service";
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CadAlunoComponent } from '../cadalunos/cadalunos.component';

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
  FormGroup: FormGroup;
  data: any;

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

  ngDataOpen(){
    if (this.data?.isUpdated) {
      this.form.get("nome")?.patchValue(this.data.nome)
      this.form.get("idade")?.patchValue(this.data.idade)
      this.form.get("endereco")?.patchValue(this.data.endereco)
      this.form.get("email")?.patchValue(this.data.email)
      this.form.get("cidade")?.patchValue(this.data.cidade)
      this.form.get("telefone")?.patchValue(this.data.telefone)
      this.form.get("cursos")?.patchValue(this.data.cursos)
      this.form.get("cpf")?.patchValue(this.data.cpf)
      this.form.get("estado")?.patchValue(this.data.estado)
      this.form.get("cep")?.patchValue(this.data.cep)
    } else {
      this.form.reset()
    }
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
  form: any;
  clickedRows = new Set<PeriodicElement>();

  constructor(private taskService: TaskService, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {}

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
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  addAndRemoveClassRow(row: PeriodicElement, add = true) {
    console.log(row)
    if (add) {
      row.enabled = true;
      this.clickedRows.add(row);
    } else {
      row.enabled = false;
      this.clickedRows.delete(row);
    }
    console.log(Array.from(this.clickedRows) )
    this.form.patchValue({cursos: Array.from(this.clickedRows) })

}
}
