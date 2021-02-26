import { Observable } from "rxjs";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { UsuarioService } from "src/app/core/services/usuario.service";
import { Usuario } from "src/app/shared/models/usuario";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class UsuarioListagemResolver implements Resolve<Usuario[]>{
   
    constructor(private usuarioService: UsuarioService) {
   
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<Usuario[]>  {

        return this.usuarioService.listarTodosUsuarios();

    }

}