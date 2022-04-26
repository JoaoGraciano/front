import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { TaskService } from "src/app/services/task.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-cadlogin',
  templateUrl: './cadlogin.component.html',
  styleUrls: ['./cadlogin.component.scss']
})
export class CadloginComponent implements OnInit {

  project: ProjectGroup;

  constructor(private fBuilder: ProjectGroup, private authService: AuthService, private router: Router) {

    this.project = this.fBuilder.group({
      name: [""],
      email: [""],
      password: [""],
    });
  }

  create() {
    this.submitted = true;
    if (this.project.status === "INVALID") return;
    this.taskService.createProject(this.project.value).subscribe((response) => {
      this.router.navigate(["/private"]);
    });
  }

  ngOnInit(): void {
  }

}
