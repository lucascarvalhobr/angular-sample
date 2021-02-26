import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import localePt from "@angular/common/locales/pt"
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IConfig, NgxMaskModule } from 'ngx-mask';

import { AppComponent } from './app.component';
import { UsuarioListagemComponent } from './modules/usuario/components/usuario-listagem/usuario-listagem.component';
import { UsuarioListagemResolver } from './modules/usuario/components/usuario-listagem/usuario-listagem.resolver';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { CoreModule } from './core/core.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { MiscelaneousModule } from './shared/misc/miscelaneous/miscelaneous.module';

const maskConfig: Partial<IConfig> ={
  validation: false
}

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    NgxMaskModule.forRoot(maskConfig),
    HttpClientModule,
    FormsModule,
    CoreModule,
    ReactiveFormsModule,
    UsuarioModule,
    NgbModule,
    OverlayModule,
    MiscelaneousModule,
    RouterModule.forRoot([
      {
        path: '',
        component: UsuarioListagemComponent,
        resolve: {
          usuarios: UsuarioListagemResolver
        }
      }
    ]),
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
