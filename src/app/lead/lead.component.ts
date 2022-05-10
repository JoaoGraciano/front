import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from "../services/task.service";
import { Router } from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, EmailValidator, Validators } from '@angular/forms';
import { AuthService } from "src/app/services/auth.service";


export interface LeadComponent {
  nome: string;
  email: string;
  cidade: string;
  telefone: number;
}

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.scss']
})
export class LeadComponent implements OnInit {

  displayedColumns: string[] = ['email', 'nome', 'telefone', 'cidade', 'encerrar', 'editar', 'deletar'];
  projects:any = [];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<LeadComponent>(true, []);
  isUpdated: any;
  _id: any;



  constructor(private taskService: TaskService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
      this.taskService.getContato().subscribe(
        (res: { projects: any; }) => {
        this.dataSource.data = res.projects;
        this.projects = res.projects;
      },
      (err: any) => console.log(err)
    );
  }

  applyFilter($event: Event){
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deletar(item: any) {
    this.taskService.deleteLead(item._id).subscribe((res) => {
      window.location.reload();
      // this.router.navigate(['/lead']);
    })
  }



  home(){
    this.router.navigate(['/home']);
  }

  relatorios(){
    this.router.navigate(['/formulario']);
  }

  cadlogin(){
    this.router.navigate(['/cadlogin']);
  }

  addcurso(){
    this.router.navigate(['/addcurso']);
  }

  lead(){
    this.router.navigate(['/lead']);
  }

  vendas(){
    this.router.navigate(['/vendas']);
  }

  openDialog(project: any, isUpdated = false) {
    const dialogRef = this.dialog.open(CadastroComponent, {
      width: '250px',
      data: {...project, isUpdated}
    });
  }
}

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
})
export class CadastroComponent {

  displayedColumns: string[] = ['email', 'nome', 'telefone', 'cidade', 'encerrar', 'editar', 'deletar'];
  projects:any = [];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<LeadComponent>(true, []);

  project: FormGroup;
  submitted=false;
  isUpdated: any;

  constructor(private taskService: TaskService, public dialog: MatDialog, public dialogRef: MatDialogRef<CadastroComponent>, @Inject(MAT_DIALOG_DATA) public data: LeadComponent, private fBuilder: FormBuilder,
  private authService: AuthService, private router: Router) {
    this.project = this.fBuilder.group({
      _id:[this.data._id],
      email: ['', Validators.email],
      nome: [""],
      telefone: [""],
      cidade: [""],
    });

  }

  ngOnInit(): void {

    console.log(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createOrUpdate(project: any) {
    this.submitted = true
    if (!this.data.isUpdated) {
      this.authService.cadContato(this.project.value).subscribe((response) => {
        window.location.reload();
      })

    } else {
      this.taskService.updatelead(this.project.value).subscribe((response)  => {
        window.location.reload();
      })
}
  }
}
