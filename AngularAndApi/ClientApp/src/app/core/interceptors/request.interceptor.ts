import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

import { LoaderService, LoadingOverlayRef } from "../services/loader.service";
import { SweetalertService } from "../services/sweetalert.service";

@Injectable({ providedIn: 'root' })
export class RequestInterceptor implements HttpInterceptor {

    //#region ::Construtor::
    constructor(private sweetAlertService: SweetalertService,
        private loaderService: LoaderService) {

    }
    //#endregion

    //#region ::Intercept::
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let loadingRef: LoadingOverlayRef;

        Promise.resolve(null).then(() => loadingRef = this.loaderService.open());

        return next.handle(request)
            .pipe(
                finalize(() => {
                    if (loadingRef) {
                        loadingRef.close();
                    }
                }),
                catchError((rep: HttpErrorResponse) => {

                    if (rep.status == 422) {
                        this.sweetAlertService.abrirMensagemValidacao(rep.error.mensagem_validacao);
                    } else {
                        this.sweetAlertService.abrirMensagemErroServidor();
                    }
                    return throwError('');
                })
            );
    }
    //#endregion
}