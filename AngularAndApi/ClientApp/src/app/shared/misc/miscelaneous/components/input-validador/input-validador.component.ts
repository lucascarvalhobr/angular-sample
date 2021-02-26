import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-validador',
  templateUrl: './input-validador.component.html',
  styleUrls: ['./input-validador.component.css']
})
export class InputValidadorComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() controlName: string;
  
  //#region ::Construtor::
  constructor() { }
  //#endregion

  //#region ::On Init::
  ngOnInit() {
  }
  //#endregion

}
