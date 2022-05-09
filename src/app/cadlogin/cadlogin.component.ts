import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

import { TaskService } from "../services/task.service";
import {SelectionModel} from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';



export interface CadloginComponent {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-cadlogin',
  templateUrl: './cadlogin.component.html',
  styleUrls: ['./cadlogin.component.scss']
})
export class CadloginComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'password', 'editar', 'deletar'];
  projects:any = [];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<CadloginComponent>(true, []);

  project: FormGroup;
  submitted=false;

  constructor(private fBuilder: FormBuilder, private authService: AuthService, private router: Router, public dialog: MatDialog, private taskService: TaskService) {

    this.project = this.fBuilder.group({
      name: [""],
      email: [""],
      password: [""],
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
    })
  }

  applyFilter($event: Event){
    console.log($event,'1')
    const filterValue = ($event.target as HTMLInputElement).value;
    console.log(filterValue,'2');
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  Relatorio() {
    this.submitted = true;
    this.router.navigate(["/formulario"]);
  }

  ngOnInit(): void {
    this.taskService.getSignUpUser().subscribe(
      (res: { projects: any; }) => {
      console.log(res);
      this.dataSource.data = res.projects;
      this.projects = res.projects;
    },
    (err: any) => console.log(err)
  );
  }

  openDialog(): any {
    const dialogRef = this.dialog.open(cadastrologin, {
      width: '250px',
      data: {name: this.name, email: this.email, password: this.password},
    });

  }

}

@Component({
  selector: 'app-cadastrologin',
  templateUrl: './cadastrologin.component.html',
  styleUrls: ['./cadlogin.component.scss']
})
export class cadastrologin {

  projects:any = [];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<CadloginComponent>(true, []);

  project: FormGroup;
  submitted=false;


  constructor(private taskService: TaskService, public dialog: MatDialog, public dialogRef: MatDialogRef<cadastrologin>, @Inject(MAT_DIALOG_DATA) public data: CadloginComponent, private fBuilder: FormBuilder,
  private authService: AuthService, private router: Router) {
    this.project = this.fBuilder.group({
      name: [""],
      email: [""],
      password: [""],
    });

  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createOrUpdate() {
    if (this.submitted = true) {
        this.project.status === "INVALID"
        this.authService.signUpUser(this.project.value).subscribe((response) => {
          window.location.reload();
      })

    } else {
      console.log(this.project)
      this.authService.updatelead(this.project).subscribe((response) => {
        this.router.navigate(["/lead"]);
      })
}
  }
}
