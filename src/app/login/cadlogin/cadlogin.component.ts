import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { cadastrologin } from 'src/app/login/cadlogin/cadastroLogin/cadastrologin.component';
import { AuthService } from 'src/app/services/auth.service';

import { TaskService } from '../../services/task.service';

export interface CadloginComponent {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-cadlogin',
  templateUrl: './cadlogin.component.html',
  styleUrls: ['./cadlogin.component.scss'],
})
export class CadloginComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'email',
    'password',
    'editar',
    'deletar',
  ];
  projects: any = [];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<CadloginComponent>(true, []);

  form: FormGroup;
  isUpdated: any;
  submitted = false;

  constructor(
    private fBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private taskService: TaskService
  ) {
    this.form = this.fBuilder.group({
      name: [''],
      email: [''],
      password: [''],
    });
  }

  // create() {
  //   this.submitted = true;
  //   if (this.project.status === "INVALID") return;
  //   this.authService.signUpUser(this.project.value).subscribe((response) => {
  //     this.router.navigate([""]);
  //   });
  // }

  deletar(item: any) {
    this.taskService.deleteUser(item._id).subscribe((res) => {
      window.location.reload();
    });
  }

  applyFilter($event: Event) {
    //console.log($event,'1')
    const filterValue = ($event.target as HTMLInputElement).value;
    //console.log(filterValue,'2');
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  Relatorio() {
    this.submitted = true;
    this.router.navigate(['/formulario']);
  }

  ngOnInit(): void {
    this.taskService.getSignUpUser().subscribe(
      (res: any) => {
        this.dataSource.data = res.projects;
        this.projects = res.projects;
      },
      (err: any) => console.log(err)
    );
  }

  openDialog(project: any, isUpdated = false) {
    const dialogRef = this.dialog.open(cadastrologin, {
      width: '250px',
      data: { ...project, isUpdated },
    });
  }
}
