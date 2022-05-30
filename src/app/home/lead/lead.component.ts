import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from "../../services/task.service";
import { Router } from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { CadastroComponent } from './cadastrolead/cadastro.component';


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
      width: 'auto',
      data: {...project, isUpdated}
    });
  }
}

