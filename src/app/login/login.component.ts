import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: FormGroup;

  constructor(private fBuilder: FormBuilder, private authService: AuthService, private router: Router) {

    this.user = this.fBuilder.group({
      email: [""],
      password: [""],
    });
  }

  ngOnInit(): void {
  }

  signIn() {
    this.authService.signInUser(this.user.value).subscribe(
      (res) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        this.router.navigate(["/home"]);
      },
      (err) => console.log(err)
    );
  }
}
