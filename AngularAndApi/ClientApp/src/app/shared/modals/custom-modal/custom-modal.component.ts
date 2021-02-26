import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from 'src/app/core/services/modal.service';


@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.css']
})
export class CustomModalComponent implements OnInit {

  //#region ::Campos::
  @Input() title;
  @Output() navigatedParameter = new EventEmitter<any>();
  //#endregion

  //#region ::Construtor::
  constructor(public activeModal: NgbActiveModal,
    private modalService: ModalService) { }
  //#endregion

  //#region ::On Init::
  ngOnInit() {

    this.modalService.activeModal = this.activeModal;
    this.modalService.getNavigationParameter()
      .subscribe((_) => {
        this.navigatedParameter.emit(_);
      })
  }
  //#endregion

}
