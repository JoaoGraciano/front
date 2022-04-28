import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

interface IUser{
  email: string,
  password: string
}


@Injectable({
  providedIn: "root",
})
export class AuthService {
  getTasks() {
    throw new Error('Method not implemented.');
  }
  private URL = "http://localhost:8080/auth";
  constructor(private http: HttpClient, private router: Router) {}

  signUpUser(user:IUser) {
    return this.http.post<any>(this.URL + "/register", user);
  }

  cadCurse(user:IUser) {
    return this.http.post<any>(this.URL + "/cadastro", user);
  }

  venda(user:IUser) {
    return this.http.post<any>(this.URL + "/venda", user);
  }

  signInUser(user:IUser) {
    return this.http.post<any>(this.URL + "/authenticate", user);
  }

  findOneUser() {
    return this.http.get<any>(this.URL + "/one");
  }

  loggedIn() {
    return !!localStorage.getItem("token");
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["/tasks"]);
  }

  getToken() {
    return localStorage.getItem("token");
  }
}
