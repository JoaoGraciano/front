import { SelectionModel } from '@angular/cdk/collections';
import { FaleconoscoComponent } from './faleconosco/faleconosco.component';
import { CursosModule } from './cursos/cursos.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { IndexModule } from './index/index.module';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { CadloginComponent } from './cadlogin/cadlogin.component';
import { FormularioComponent } from './formulario/formulario.component';
import { AddcursoComponent } from './addcurso/addcurso.component';
import { VendasComponent } from './vendas/vendas.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadComponent } from './lead/lead.component';
import { CadastroComponent } from './lead/lead.component';
import { cadastrologin } from './cadlogin/cadlogin.component';

import {MaterialExampleModule} from '../material.module';
import {MatNativeDateModule} from '@angular/material/core';

import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { importType } from '@angular/compiler/src/output/output_ast';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CursosModule,
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


  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports : [ VendasComponent],
})
export class AppModule { }
