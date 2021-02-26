import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/core/services/modal.service';
import { SweetalertService } from 'src/app/core/services/sweetalert.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { escolaridades } from 'src/app/core/util/constants';
import { checarSeDataAniversarioValida, formatarData } from 'src/app/core/util/functions';
import { Usuario } from 'src/app/shared/models/usuario';


@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css'],
})
export class UsuarioCadastroComponent implements OnInit {

  //#region ::Campos::
  usuarioForm: FormGroup;

  escolaridades: { id: number, nome: string }[];

  formSubmitted: boolean;

  criandoUsuario = true;

  usuario: Usuario;

  dataLimiteNascimento: string;
  //#endregion

  //#region ::Construtor::
  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private sweetAlertService: SweetalertService,
    private modalService: ModalService) {

  }
  //#endregion

  //#region ::On Init::
  ngOnInit() {
    this.escolaridades = escolaridades;

    this.dataLimiteNascimento = formatarData(new Date(), 'yyyy-MM-dd')

  }
  //#endregion

  //#region ::Carregar dados navegação::
  carregarDadosNavegacao(usuario: Usuario) {
    this.usuario = usuario;

    if (this.usuario != null) {
      this.criandoUsuario = false;
    }

    this.construirForm();
  }
  //#endregion

  //#region ::Construir Form::
  private construirForm() {
    this.usuarioForm = this.formBuilder.group({
      nome: new FormControl(this.usuario == null ? null : this.usuario.nome, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      sobrenome: new FormControl(this.usuario == null ? null : this.usuario.sobrenome, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      email: new FormControl(this.usuario == null ? null : this.usuario.email, [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),
      data_nascimento: new FormControl(this.usuario == null ? null : formatarData(this.usuario.data_nascimento, 'yyyy-MM-dd'), [
        Validators.required,
      ]),
      escolaridade_id: new FormControl(this.usuario == null ? null : this.usuario.escolaridade_id, [
        Validators.required
      ])
    });
  }
  //#endregion

  //#region ::Submit::
  submit() {

    if (this.usuarioForm.invalid) {

      this.usuarioForm.markAllAsTouched();

      return;
    }

    if (this.criandoUsuario) {

      this.criarUsuario();

      return;
    }

    this.atualizarUsuario();
  }
  //#endregion

  //#region ::Atualizar usuário::
  private atualizarUsuario() {
    this.sweetAlertService.abrirMensagemConfirmacao()
      .then((operacaoConfirmada) => {
        if (!operacaoConfirmada)
          return;

        var usuario = this.usuarioForm.getRawValue() as Usuario;

        if (this.validarDataNascimento(usuario.data_nascimento) == false)
          return;

        this.usuarioService.atualizarUsuario(this.usuario.id, usuario)
          .subscribe(() => {
            this.modalService.refreshRootScreen('Usuário atualizado com sucesso!');
            this.modalService.close();
          });
      });
  }
  //#endregion

  //#region ::Criar usuário::
  private criarUsuario() {
    this.sweetAlertService.abrirMensagemConfirmacao()
      .then((operacaoConfirmada) => {

        if (!operacaoConfirmada)
          return;

        var usuario = this.usuarioForm.getRawValue() as Usuario;

        if (this.validarDataNascimento(usuario.data_nascimento) == false)
          return;

        this.usuarioService.criarUsuario(usuario)
          .subscribe(() => {
            this.modalService.refreshRootScreen('Usuário cadastrado com sucesso!');
            this.modalService.close();
          });
      });
  }
  //#endregion

  //#region  ::Validar Data de nascimento::
  validarDataNascimento(dataNascimento: Date) {
    if (checarSeDataAniversarioValida(dataNascimento) == false) {

      this.sweetAlertService.abrirMensagemValidacao('Data de nascimento é inválida.');

      return false;
    }

    return true;
  }
  //#endregion

  //#region ::Preenchimento válido::
  preenchimentoValido(formControlName: string){
    return this.usuarioForm.get(formControlName).invalid && this.usuarioForm.get(formControlName).touched;
  }
  //#endregion
}
