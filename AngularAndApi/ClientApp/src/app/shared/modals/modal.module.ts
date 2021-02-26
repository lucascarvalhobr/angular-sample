import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomModalComponent } from './custom-modal/custom-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    CustomModalComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports:[
    CustomModalComponent
  ]
})
export class ModalModule { }
