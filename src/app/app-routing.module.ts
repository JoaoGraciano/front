import { FaleconoscoComponent } from './faleconosco/faleconosco.component';
import { HomeComponent } from './home/home.component';
import { CursosComponent } from './cursos/cursos.component';
import { FormularioComponent } from './formulario/formulario.component';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { VendasComponent } from './vendas/vendas.component';
import { AddcursoComponent } from './addcurso/addcurso.component';
import { cadastrologin, CadloginComponent } from './cadlogin/cadlogin.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CadastroComponent, LeadComponent } from './lead/lead.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
