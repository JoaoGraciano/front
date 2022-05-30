import { CursodetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from "../../services/task.service";
import { ActivatedRoute, Router } from "@angular/router";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, EmailValidator, Validators } from '@angular/forms';
import { AuthService } from "src/app/services/auth.service";


export interface PeriodicElement {
  curso: string,
  grau: string,
  duracao: number,
  valor: number,
  descricao: string,
}

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CursosComponent implements OnInit {

  displayedColumns: string[] = ['curso', 'grau', 'duracao', 'valor', 'descricao'];
  projects:any = [];
  dataSource = new MatTableDataSource<any>();
  clickedRows = new Set<PeriodicElement>();
  expandedElement!: PeriodicElement;
  dialog: any;
  isUpdated: any;
  private _id: any;
  id: any;
  submitted=false;

  constructor(private taskService: TaskService, public dialogRef: MatDialogRef<CursodetalheComponent>, @Inject(MAT_DIALOG_DATA) public data: CursosComponent, private fBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.projects = this.fBuilder.group({
      _id:[this.data.id],
      curso: [""],
      grau: [""],
      duracao: [""],
      valor: [""],
      descricao: [""],
    });

  }

  ngOnInit() {
    this.taskService.getTasks().subscribe(
      (res: any) => {
        this.dataSource.data = res.projects;
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

  update(project: any) {
    console.log(project)
    this.taskService.getUpdate(project);

    this.router.navigate(['/addcurso']);
  }

  applyFilter($event: Event){
    console.log($event,'1')
    const filterValue = ($event.target as HTMLInputElement).value;
    console.log(filterValue,'2');
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue.trim().toUpperCase();
  }


  openDialog(project: any, isUpdated = false) {
    const dialogRef = this.dialog.open(CursodetalheComponent, {
      width: '250px',
      data: {...project, isUpdated}
    });
  }
}
