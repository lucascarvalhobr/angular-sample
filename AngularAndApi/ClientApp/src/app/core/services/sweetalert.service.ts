import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  //#region ::Construtor::
  constructor() { }
  //#endregion

  abrirMensagemSucesso(text: string){
    Swal.fire({
      text,
      icon: 'success'
    });
  }

  abrirMensagemErroServidor(){
    Swal.fire({
      icon: 'error',
      title: 'Ops...',
      text: 'Algo deu errado no servidor, repita sua solicitação mais tarde.'
    })
  }

  abrirMensagemValidacao(text: string){
    Swal.fire({
      icon:'warning',
      title:'Erro de validação',
      text: text
    })
  }

  async abrirMensagemConfirmacao(title: string = 'Deseja confirmar esta operação?', text: string = null, confirmButtonText: string = 'Sim', cancelButtonText: string = 'Não'): Promise<boolean> {
    return await Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText
    }).then((result) => {
      if (result.value) {
        return true;
      } else {
        return false;
      }
    });
  }
}
