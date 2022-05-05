import { Component, OnInit } from '@angular/core';
import { TaskService } from "../services/task.service";
import { Router } from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';


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

  displayedColumns: string[] = ['select','email', 'nome', 'telefone', 'duvidas', 'encerrar'];
  projects:any = [];
  dataSource = TaskService;
  selection = new SelectionModel<LeadComponent>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected;
    const numRows = this.dataSource.data;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }


  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {

        this.taskService.getContato().subscribe(
      (res: { projects: any; }) => {
        console.log(res);

        this.projects = res.projects;
      },
      (err: any) => console.log(err)
    );

  }

}

