import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TaskService } from "../../services/task.service";
import { Router } from "@angular/router";
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';


export interface PeriodicElement {
  curso: string;
  grau: string;
  duracao: string;
}


@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MatriculaComponent implements OnInit {

  displayedColumns: string[] = ['curso', 'grau', 'duracao'];
  projects:any = [];
  dataSource = new MatTableDataSource<any>();
  clickedRows = new Set<PeriodicElement>();
  selection = new SelectionModel<MatriculaComponent>(true, []);
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

}
