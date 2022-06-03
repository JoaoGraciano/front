import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { TaskService } from '../../services/task.service';
import { EditvendasComponent } from './editvendas/editvendas.component';

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
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class VendasComponent implements OnInit {
  displayedColumns: string[] = [
    'curso',
    'grau',
    'duracao',
    'valor',
    'descricao',
  ];
  projects: any = [];
  dataSource = new MatTableDataSource<any>();
  clickedRows = new Set<PeriodicElement>();
  selection = new SelectionModel<VendasComponent>(true, []);
  expandedElement!: PeriodicElement;
  isUpdated: any;

  constructor(
    private taskService: TaskService,
    private router: Router,
    public dialog: MatDialog
  ) {}

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
    let text = "Deseja deletar essa venda?"
    if (confirm(text) == true)
    {
      this.taskService.deleteProject(item._id).subscribe((res) => {
        this.router.navigate(['/vendas']);
      });
    } else {
    }
  }

  applyFilter($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue.trim().toUpperCase();
  }

  openDialog(project: any, isUpdated = false) {
    const dialogRef = this.dialog.open(EditvendasComponent, {
      width: '250px',
      data: { ...project, isUpdated },
    });
  }
}
