import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioCadastroComponent } from './components/usuario-cadastro/usuario-cadastro.component';
import { UsuarioListagemComponent } from './components/usuario-listagem/usuario-listagem.component';
import { ModalModule } from 'src/app/shared/modals/modal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {  RouterModule } from '@angular/router';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { MiscelaneousModule } from 'src/app/shared/misc/miscelaneous/miscelaneous.module';



const maskConfig: Partial<IConfig> ={
  validation: false
}

@NgModule({
  declarations: [
    UsuarioCadastroComponent, 
    UsuarioListagemComponent
  ],  
  imports: [
    CommonModule,
    NgxMaskModule.forRoot(maskConfig),
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    MiscelaneousModule
  ],
  entryComponents:[
    UsuarioCadastroComponent
  ]
})
export class UsuarioModule { }
