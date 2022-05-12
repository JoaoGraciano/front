import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from "../services/task.service";
import { Router } from "@angular/router";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, EmailValidator, Validators } from '@angular/forms';
import { AuthService } from "src/app/services/auth.service";


export interface PeriodicElement {
  curso: string;
  grau: string;
  duracao: string;
  valor: number;
  descricao: string;
}

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class VendasComponent implements OnInit {

  displayedColumns: string[] = ['curso', 'grau', 'duracao', 'valor', 'descricao'];
  projects:any = [];
  dataSource = new MatTableDataSource<any>();
  clickedRows = new Set<PeriodicElement>();
  selection = new SelectionModel<VendasComponent>(true, []);
  expandedElement!: PeriodicElement;
  isUpdated: any;

  constructor(private taskService: TaskService, private router: Router, public dialog: MatDialog) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe(
      (res: any) => {
        this.dataSource.data = res.projects;
        this.projects = res.projects;
      },
      (err) => console.log(err)

    );
  }

  vendas(project: any) {
    console.log(project)
    this.taskService.getDadosCurso(project);

    this.router.navigate(['/pagamento']);
  }

  deletar(item: any) {
    console.log(item._id)
    this.taskService.deleteProject(item._id).subscribe((res) => {
      console.log(res)
      this.router.navigate(['/vendas']);
    })
  }

  applyFilter($event: Event){
    console.log($event,'1')
    const filterValue = ($event.target as HTMLInputElement).value;
    console.log(filterValue,'2');
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue.trim().toUpperCase();
  }

  openDialog(project: any, isUpdated = false) {
    const dialogRef = this.dialog.open(EditvendasComponent, {
      width: '250px',
      data: {...project, isUpdated}
    });

  }
}



@Component({
  selector: 'app-editvendas',
  templateUrl: './editvendas.component.html',
})
export class EditvendasComponent {

  displayedColumns: string[] = ['curso', 'grau', 'duracao', 'valor', 'descricao'];

  projects:any = [];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<EditvendasComponent>(true, []);

  form: FormGroup;
  submitted=false;
  isUpdated: any;
  authService: any;
  project: any;

  constructor(private taskService: TaskService, public dialog: MatDialog, public dialogRef: MatDialogRef<VendasComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fBuilder: FormBuilder, private router: Router) {
    this.form = this.fBuilder.group({
      _id:[this.data._id],
      curso: [""],
      grau: [""],
      duracao: [""],
      valor: [""],
      descricao: [""],
    });
  }

  ngOnInit(): void {
    if (this.data?.isUpdated) {
      console.log(this.data)
      this.form.get("curso")?.patchValue(this.data.curso)
      this.form.get("grau")?.patchValue(this.data.grau)
      this.form.get("duracao")?.patchValue(this.data.duracao)
      this.form.get("valor")?.patchValue(this.data.valor)
      this.form.get("descricao")?.patchValue(this.data.curso)
    } else {
      this.form.reset()
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createOrUpdate(project: any) {
    this.submitted = true
    if (!this.data.isUpdated) {
      this.authService.cadCurse(this.form.value).subscribe(() => {
        window.location.reload();
      })
    } else {
      this.taskService.updateCurso(this.form.value).subscribe((response)  => {
        window.location.reload();
      })
}
  }
  }


  // {
  //   this.submitted = true
  //     this.taskService.updateCurso(this.form.value).subscribe((response)  => {
  //       window.location.reload();
  //     })

  // }
