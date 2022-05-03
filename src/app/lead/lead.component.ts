import { Component, OnInit } from '@angular/core';
import { TaskService } from "../services/task.service";
import { Router } from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
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

  displayedColumns: string[] = ['email', 'nome', 'telefone', 'duvidas'];
  projects:any = [];
  dataSource = new MatTableDataSource<PeriodicElement>(this.projects);
  selection = new SelectionModel<PeriodicElement>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }


  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {

        this.taskService.getContato().subscribe(
      (res) => {
        console.log(res);

        this.projects = res.projects;
      },
      (err) => console.log(err)
    );

  }

}

