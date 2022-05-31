import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { TaskService } from '../../../services/task.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { CadloginComponent } from '../cadlogin.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-cadastrologin',
  templateUrl: './cadastrologin.component.html',
  styleUrls: ['./cadastrologin.component.scss'],
})
export class cadastrologin {
  projects: any = [];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<CadloginComponent>(true, []);

  form: FormGroup;
  submitted = false;
  isUpdated: any;

  constructor(
    private taskService: TaskService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<cadastrologin>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fBuilder.group({
      _id: [this.data._id],
      name: [''],
      email: [''],
      password: [''],
    });
  }

  ngOnInit(): void {
    if (this.data?.isUpdated) {
      this.form.get('name')?.patchValue(this.data.name);
      this.form.get('email')?.patchValue(this.data.email);
      this.form.get('password')?.patchValue(this.data.password);
    } else {
      this.form.reset();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createOrUpdate(project: any) {
    this.submitted = true;
    if (!this.data.isUpdated) {
      this.authService.signUpUser(this.form.value).subscribe((response) => {
        window.location.reload();
      });
    } else {
      this.taskService.updateLogin(this.form.value).subscribe((response) => {
        window.location.reload();
      });
    }
  }
}
