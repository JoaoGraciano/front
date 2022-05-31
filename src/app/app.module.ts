import { HeaderComponent } from './header/header.component';
import { FaleconoscoComponent } from './index/faleconosco/faleconosco.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { IndexModule } from './index/index.module';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { CadloginComponent } from './login/cadlogin/cadlogin.component';
import { FormularioComponent } from './home/formulario/formulario.component';
import { AddcursoComponent } from './home/cursos/addcurso/addcurso.component';
import { VendasComponent } from './home/vendas/vendas.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { PagamentoComponent } from './home/vendas/pagamento/pagamento.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadComponent } from './home/lead/lead.component';
import { CadastroComponent } from './home/lead/cadastrolead/cadastro.component';
import { CursosComponent } from './home/cursos/cursos.component';
import { MaterialExampleModule } from '../material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { EditvendasComponent } from './home/vendas/editvendas/editvendas.component';
import { AlunosComponent } from './home/alunos/alunos.component';
import { InfoAlunoComponent } from './home/alunos/Info-Alunos/info-aluno.component';
import { MatriculaComponent } from './home/matricula/matricula.component';
import { CadAlunoComponent } from './home/alunos/cadalunos/cadalunos.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComprovanteComponent } from './home/formulario/comprovante/comprovante.component';
import { cadastrologin } from './login/cadlogin/cadastroLogin/cadastrologin.component';
import { SelectAlunoComponent } from './home/vendas/pagamento/selectaluno/selectaluno.component';

// import {TableSelectionExample} from './table-selection-example';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    CadloginComponent,
    FormularioComponent,
    AddcursoComponent,
    VendasComponent,
    PagamentoComponent,
    HomeComponent,
    FaleconoscoComponent,
    LeadComponent,
    CadastroComponent,
    CadloginComponent,
    cadastrologin,
    CursosComponent,
    AlunosComponent,
    MatriculaComponent,
    CadAlunoComponent,
    InfoAlunoComponent,
    SelectAlunoComponent,
    HeaderComponent,
    ComprovanteComponent,
    EditvendasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IndexModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatDialogModule,

  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports : [ VendasComponent],
})
export class AppModule { }
