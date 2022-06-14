import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { object } from 'joi';

import { TaskService } from '../../services/task.service';
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
    'editar',
    'deletar',
  ];
  projects: any = [];
  dataSource = new MatTableDataSource<any>();
  form: FormGroup;
  _id: number | undefined;

  project: Array<any> = [];
  route: any;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private fBuilder: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.form = this.fBuilder.group({
      _id: [],
      aluno: null,
      cursos: [],
      valor_total: [''],
      valorPago: [''],
      troco: [''],
      user: [''],
    });
  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
    const comprovante = this.dialog.open(ComprovanteComponent, {
      width: 'auto',
      data: sale,
    });
  }

  applyFilter($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue.trim().toUpperCase();
    console.log(this.dataSource)
  }


  editar(item: any) {
    this.form.patchValue(item);
    this._id = item._id;
    console.log(this.form.value);
    this.router.navigate(['/pagamento'], {
      queryParams: {
        _id: this._id,
        aluno: JSON.stringify(this.form.value.aluno),
        cursos: JSON.stringify(this.form.value.cursos),
        valor_total: this.form.value.valor_total,
        valorPago: this.form.value.valorPago,
        troco: this.form.value.troco,
        user: JSON.stringify(this.form.value.user),
      },
    });
    }

  deletar(item: any) {
    let text = `Deseja deletar essa venda?`
    if (confirm(text) == true)
    {
      this.taskService.deleteVenda(item._id).subscribe((res) => {
        window.location.reload();
      });
    } else {
    }
  }
}
