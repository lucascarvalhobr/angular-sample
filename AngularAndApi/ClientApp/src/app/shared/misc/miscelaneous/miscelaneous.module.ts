import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputValidadorComponent } from './components/input-validador/input-validador.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    InputValidadorComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    InputValidadorComponent,
    LoaderComponent
  ],
  entryComponents:[
    LoaderComponent
  ]
})
export class MiscelaneousModule { }
