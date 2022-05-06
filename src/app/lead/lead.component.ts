import { Component, OnInit } from '@angular/core';
import { TaskService } from "../services/task.service";
import { Router } from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';


export interface LeadComponent {
  position: number;
  nome: string;
  email: string;
  duvidas: string;
  telefone: number;
}

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.scss']
})
export class LeadComponent implements OnInit {

  displayedColumns: string[] = ['email', 'nome', 'telefone', 'duvidas', 'encerrar', 'editar', 'deletar'];
  projects:any = [];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<LeadComponent>(true, []);

  constructor(private taskService: TaskService, private router: Router) { }

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
    console.log(item._id)
    this.taskService.deleteLead(item._id).subscribe((res) => {
      console.log(res)
      this.router.navigate(['/lead']);
    })
  }
}

