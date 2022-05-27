import { ComprovanteComponent } from './formulario/comprovante/comprovante.component';
import { HeaderComponent } from './header/header.component';
import { CadAlunoComponent } from './cadalunos/cadalunos.component';
import { CursodetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';
import { FaleconoscoComponent } from './faleconosco/faleconosco.component';
import { HomeComponent } from './home/home.component';
import { CursosComponent } from './cursos/cursos.component';
import { FormularioComponent } from './formulario/formulario.component';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { VendasComponent, EditvendasComponent } from './vendas/vendas.component';
import { AddcursoComponent } from './addcurso/addcurso.component';
import { cadastrologin, CadloginComponent } from './cadlogin/cadlogin.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CadastroComponent, LeadComponent } from './lead/lead.component';
import { AlunosComponent } from './alunos/alunos.component';
import { MatriculaComponent } from './matricula/matricula.component';
import { InfoAlunoComponent } from './alunos/alunos.component';
import { SelectAlunoComponent } from './pagamento/pagamento.component';


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
  { path: 'curso-detalhe', component:CursodetalheComponent},
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
