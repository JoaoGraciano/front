import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class TaskService {

  private URL = "http://localhost:8080/projects";
  static data: any;
  static filter: string;
  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get(this.URL + "/");
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

  updateProject(project: any) {
    const url = `${this.URL}/${project._id}`;

    console.log(project);
    delete project._id;

    return this.http.put(url, project);
  }

  deleteProject(id: string) {
    return this.http.delete(`${this.URL}/${id}`);
  }

  deleteLead(id: string) {
    return this.http.delete(`${this.URL}/${id}`);
  }
}
