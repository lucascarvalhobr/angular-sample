import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import { SweetalertService } from 'src/app/core/services/sweetalert.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Usuario } from 'src/app/shared/models/usuario';
import { UsuarioCadastroComponent } from '../usuario-cadastro/usuario-cadastro.component';

@Component({
  selector: 'app-usuario-listagem',
  templateUrl: './usuario-listagem.component.html',
  styleUrls: ['./usuario-listagem.component.css']
})
export class UsuarioListagemComponent implements OnInit, OnDestroy {

  //#region ::Campos::
  usuarios: Usuario[];
  subscription: Subscription;
  //#endregion

  //#region ::Construtor::
  constructor(private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private usuarioService: UsuarioService,
    private sweetAlertService: SweetalertService) { }
  //#endregion

  //#region ::On Init::
  ngOnInit() {
    this.usuarios = this.activatedRoute.snapshot.data.usuarios;

    this.subscription = this.modalService.onRefreshRootScreen()
      .subscribe((refreshMessage) => {
        if (refreshMessage == null)
          return;

        this.carregarTodosUsuarios(refreshMessage);
      });
  }
  //#endregion

  //#region ::On Destroy::
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  //#endregion

  //#region ::Carregar todos usuários::
  carregarTodosUsuarios(refreshMessage?: string) {
    this.usuarioService.listarTodosUsuarios()
      .subscribe((usuarios) => {
        this.usuarios = usuarios;

        if (refreshMessage != null) {
          this.sweetAlertService.abrirMensagemSucesso(refreshMessage);
        }
      });
  }
  //#endregion

  //#region ::Abrir tela cadastro usuário::
  abrirTelaCadastroUsuario() {
    this.modalService.openModal(UsuarioCadastroComponent, null);
  }
  //#endregion

  //#region ::Abrir tela de atualização de usuário::
  abrirTelaAtualizacaoUsuario(usuario: Usuario) {
    this.modalService.openModal(UsuarioCadastroComponent, usuario);
  }
  //#endregion

  //#region ::Apagar usuário::
  apagarUsuario(usuario: Usuario) {
    this.sweetAlertService.abrirMensagemConfirmacao()
      .then((operacaoConfirmada) => {

        if (!operacaoConfirmada)
          return;

        this.usuarioService.apagarUsuario(usuario.id)
          .subscribe(() => {
            this.carregarTodosUsuarios('Usuario removido com sucesso.');
          });
      });
  }
  //#endregion
}
