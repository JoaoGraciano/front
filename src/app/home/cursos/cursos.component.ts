import { Component, OnInit } from '@angular/core';
import { TaskService } from "../../services/task.service";
import { Router } from "@angular/router";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditvendasComponent } from '../vendas/editvendas/editvendas.component';
import { VendasComponent } from '../vendas/vendas.component';
import { SelectionModel } from '@angular/cdk/collections';


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
    this.taskService.getDadosCurso(project);

    this.router.navigate(['/pagamento']);
  }

  deletar(item: any) {
    this.taskService.deleteProject(item._id).subscribe((res) => {
      this.router.navigate(['/vendas']);
    })
  }

  applyFilter($event: Event){
    const filterValue = ($event.target as HTMLInputElement).value;
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
