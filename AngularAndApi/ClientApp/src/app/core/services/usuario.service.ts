import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OperatorFunction } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { map } from 'rxjs/operators'

import { Usuario } from 'src/app/shared/models/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl = environment.baseUrl;

  //#region ::Construtor::
  constructor(protected httpClient: HttpClient) { }
  //#endregion

  listarTodosUsuarios() {
    return this.httpClient.get(this.baseUrl)
      .pipe(
        this.mapResponse<Usuario[]>()
      );
  }

  consultarUsuario(idUsuario: number) {
    return this.httpClient.get(this.baseUrl + idUsuario)
      .pipe(
        this.mapResponse<Usuario[]>()
      );
  }

  criarUsuario(usuario: Usuario) {
    return this.httpClient.post(this.baseUrl, usuario);
  }

  atualizarUsuario(idUsuario: number, usuario: Usuario) {
    return this.httpClient.put(this.baseUrl + idUsuario, usuario);
  }

  apagarUsuario(idUsuario: number) {
    return this.httpClient.delete(this.baseUrl + idUsuario);
  }

  protected mapResponse<Usuario>(): OperatorFunction<Object, Usuario> {
    return map((apiResponse: ApiResponse) => {
      return apiResponse.data as Usuario;
    });
  }
}
