import { ComprovanteComponent } from './home/formulario/comprovante/comprovante.component';
import { HeaderComponent } from './header/header.component';
import { CadAlunoComponent } from './home/alunos/cadalunos/cadalunos.component';
import { FaleconoscoComponent } from './index/faleconosco/faleconosco.component';
import { HomeComponent } from './home/home.component';
import { CursosComponent } from './home/cursos/cursos.component';
import { FormularioComponent } from './home/formulario/formulario.component';
import { PagamentoComponent } from './home/vendas/pagamento/pagamento.component';
import { VendasComponent } from './home/vendas/vendas.component';
import { EditvendasComponent } from './home/vendas/editvendas/editvendas.component';
import { AddcursoComponent } from './home/cursos/addcurso/addcurso.component';
import { CadloginComponent } from './login/cadlogin/cadlogin.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LeadComponent } from './home/lead/lead.component';
import { CadastroComponent } from './home/lead/cadastrolead/cadastro.component';
import { AlunosComponent } from './home/alunos/alunos.component';
import { MatriculaComponent } from './home/matricula/matricula.component';
import { InfoAlunoComponent } from './home/alunos/Info-Alunos/info-aluno.component';
import { SelectAlunoComponent } from './home/vendas/pagamento/selectaluno/selectaluno.component';
import { cadastrologin } from './login/cadlogin/cadastroLogin/cadastrologin.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadlogin', component: CadloginComponent, canActivate: [AuthGuard] },
  { path: 'addcurso', component: AddcursoComponent, canActivate: [AuthGuard] },
  { path: 'vendas', component: VendasComponent, canActivate: [AuthGuard] },
  { path: 'pagamento', component: PagamentoComponent, canActivate: [AuthGuard] },
  { path: 'formulario', component: FormularioComponent, canActivate: [AuthGuard] },
  { path: 'cursos', component: CursosComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'faleconosco', component: FaleconoscoComponent },
  { path: 'lead', component: LeadComponent, canActivate: [AuthGuard] },
  { path: 'cadastro', component: CadastroComponent, canActivate: [AuthGuard] },
  { path: 'cadastrologin', component: cadastrologin, canActivate: [AuthGuard] },
  { path: 'cursos', component: CursosComponent, canActivate: [AuthGuard] },
  { path: 'editvenda', component: EditvendasComponent, canActivate: [AuthGuard] },
  { path: 'alunos', component: AlunosComponent, canActivate: [AuthGuard] },
  { path: 'matricula', component: MatriculaComponent, canActivate: [AuthGuard] },
  { path: 'cadaluno', component: CadAlunoComponent, canActivate: [AuthGuard] },
  { path: 'infoaluno', component: InfoAlunoComponent, canActivate: [AuthGuard] },
  { path: 'selectaluno', component: SelectAlunoComponent, canActivate: [AuthGuard] },
  { path: 'header', component: HeaderComponent, canActivate: [AuthGuard] },
  { path: 'comprovante', component: ComprovanteComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
