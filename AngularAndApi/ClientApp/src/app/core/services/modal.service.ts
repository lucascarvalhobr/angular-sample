import { Injectable } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  //#region ::Campos::
  activeModal: NgbActiveModal;

  private modalOptions: NgbModalOptions;

  private navigationParameterSubject = new BehaviorSubject<any>(null);
  private refreshRootScreenSubject = new BehaviorSubject<string>(null);
  //#endregion

  //#region ::Construtor::
  constructor(protected modal: NgbModal) { }
  //#endregion

  //#region ::Open modal::
  openModal(content: any, navigationParameter: any) {

    this.setNavigationParameter(navigationParameter);

    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'lg'
    };

    return this.modal.open(content, this.modalOptions)
  }
  //#endregion

  //#region ::Get navigation parameter::
  getNavigationParameter() {
    return this.navigationParameterSubject.asObservable();
  }
  //#endregion

  //#region ::Set navigation parameter::
  setNavigationParameter(value: any) {
    this.navigationParameterSubject.next(value);
  }
  //#endregion

  //#region ::On Refresh root screen::
  onRefreshRootScreen() {
    return this.refreshRootScreenSubject.asObservable();
  }
  //#endregion

  //#region ::Refresh root screen::
  refreshRootScreen(message?: string) {
    this.refreshRootScreenSubject.next(message);
  }
  //#endregion

  //#region ::Clear::
  close() {
    this.modal.dismissAll();
  }
  //#endregion

}
