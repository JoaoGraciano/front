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
  { path: 'cadlogin', component: CadloginComponent },
  { path: 'addcurso', component: AddcursoComponent },
  { path: 'vendas', component: VendasComponent, canActivate: [AuthGuard] },
  { path: 'pagamento', component: PagamentoComponent},
  { path: 'formulario', component:FormularioComponent},
  { path: 'cursos', component: CursosComponent},
  { path: 'home', component:HomeComponent},
  { path: 'faleconosco', component:FaleconoscoComponent},
  { path: 'lead', component:LeadComponent},
  { path: 'cadastro', component:CadastroComponent},
  { path: 'cadastrologin', component:cadastrologin},
  { path: 'cursos', component:CursosComponent},
  { path: 'editvenda', component: EditvendasComponent },
  { path: 'alunos', component: AlunosComponent},
  { path: 'matricula', component: MatriculaComponent},
  { path: 'cadaluno', component: CadAlunoComponent},
  { path: 'infoaluno', component: InfoAlunoComponent},
  { path: 'selectaluno', component: SelectAlunoComponent},
  { path: 'header', component: HeaderComponent},
  { path: 'comprovante', component: ComprovanteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
