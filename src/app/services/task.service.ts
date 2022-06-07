import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  navigate(arg0: string[]) {
    throw new Error('Method not implemented.');
  }

  private URL = "http://localhost:8080/projects";
  static data: any;
  static filter: string;
  static paginator: any;
  static sort: any;
  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get(this.URL + "/");
  }

  getSignUpUser() {
    return this.http.get<any>(this.URL + "/user");
  }

  getAluno() {
    return this.http.get<any>(this.URL + "/aluno");
  }

  getUpdate(project: any) {
    return this.http.get<any>(this.URL + "/update");
  }

  getVenda() {
    return this.http.get<any>(this.URL + "/venda");
  }

  getDadosCurso(project: any) {
    return this.http.get<any>(this.URL + "/update");
  }

  getCadastro() {
    return this.http.get<any>(this.URL + "/Cad");
  }

  getContato() {
    return this.http.get<any>(this.URL + "/contato");
  }

  getPrivateProject() {
    return this.http.get<any>(this.URL + "/");
  }

  getProjectById(id: string) {
    return this.http.get<any>(this.URL + "/" + id);
  }

  createProject(project: any) {
    return this.http.post(this.URL, project);
  }

  updateLogin(project: any) {
    const url = `${this.URL}/updateUser/${project._id}`;
    //console.log(project);

    return this.http.put(url, project);
  }

  updateAluno(project: any) {
    const url = `${this.URL}/updateAlunos/${project._id}`;
    //console.log(project);

    return this.http.put(url, project);
  }

  updatelead(project: any) {
    const url = `${this.URL}/lead/${project._id}`;
    //console.log(project);

    return this.http.put(url, project);
  }

  updateCurso(project: any) {
    const url = `${this.URL}/Curso/${project._id}`;
    //console.log(project);

    return this.http.put(url, project);
  }

  updateVenda(project: any) {
    const url = `${this.URL}/venda/${project._id}`;
    //console.log(project);

    return this.http.put(url, project);
  }

  deleteProject(id: string) {
    return this.http.delete(`${this.URL}/${id}`);
  }

  deleteLead(id: string) {
    return this.http.delete(`${this.URL}/contato/${id}`);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.URL}/user/${id}`);
  }

  deleteAluno(id: string) {
    return this.http.delete(`${this.URL}/aluno/${id}`);
  }

  deleteVenda(id: string) {
    return this.http.delete(`${this.URL}/venda/${id}`);
  }
}
