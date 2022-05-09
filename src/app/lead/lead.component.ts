import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from "../services/task.service";
import { Router } from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, EmailValidator } from '@angular/forms';
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


  constructor(private taskService: TaskService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {

      this.taskService.getContato().subscribe(
        (res: { projects: any; }) => {
        console.log(res);
        this.dataSource.data = res.projects;
        this.projects = res.projects;
      },
      (err: any) => console.log(err)
    );

  }

  applyFilter($event: Event){
    console.log($event,'1')
    const filterValue = ($event.target as HTMLInputElement).value;
    console.log(filterValue,'2');
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

  openDialog(): any {
    const dialogRef = this.dialog.open(CadastroComponent, {
      width: '250px',
      data: {nome: this.nome, email: this.email, cidade: this.cidade, telefone: this.telefone},
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

  constructor(private taskService: TaskService, public dialog: MatDialog, public dialogRef: MatDialogRef<CadastroComponent>, @Inject(MAT_DIALOG_DATA) public data: LeadComponent, private fBuilder: FormBuilder,
  private authService: AuthService, private router: Router) {
    this.project = this.fBuilder.group({
      email: [""],
      nome: [""],
      telefone: [""],
      cidade: [""],
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
      this.authService.cadContato(this.project.value).subscribe((response) => {
        window.location.reload();
      })

    } else {
      console.log(this.project)
      this.authService.updatelead(this.project).subscribe((response)  => { console.log(this.project)
        window.location.reload();
      })
}
  }
}
