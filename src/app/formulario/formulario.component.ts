import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ComprovanteComponent } from './comprovante/comprovante.component';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
  displayedColumns: string[] = [
    'nome',
    'cidade',
    'cpf',
    'detalhes',
    'user',
    'createdAt',
  ];
  projects: any = [];
  dataSource = new MatTableDataSource<any>();
  project: FormGroup;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private fBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.project = this.fBuilder.group({
      aluno: null,
      cursos: [],
      valor_total: [''],
      valorPago: [''],
      troco: [''],
      user: [''],
    });
  }

  ngOnInit() {
    this.taskService.getVenda().subscribe(
      (res) => {
        this.dataSource.data = res.projects;
        this.projects = res.projects;
      },
      (err) => console.log(err)
    );
    console.log(this.dataSource);
  }

  openInfo(sale: any) {
    console.log(sale,'1');
    // return
    // this.taskService.getVenda();
    // this.router.navigate(['/comprovante']);

    const comprovante = this.dialog.open(ComprovanteComponent, {
      width: 'auto',
      data: sale,
    });
  }

  applyFilter($event: Event) {
    console.log($event, '1');
    const filterValue = ($event.target as HTMLInputElement).value;
    console.log(filterValue, '2');
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
