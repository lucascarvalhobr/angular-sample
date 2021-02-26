import { DatePipe } from '@angular/common';
import { NgZone } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction } from 'rxjs';

export function toInteger(value: any): number {
  return parseInt(`${value}`, 10);
}

export function toString(value: any): string {
  return (value !== undefined && value !== null) ? `${value}` : '';
}

export function getValueInRange(value: number, max: number, min = 0): number {
  return Math.max(Math.min(value, max), min);
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isNumber(value: any): value is number {
  return !isNaN(toInteger(value));
}

export function isInteger(value: any): value is number {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}

export function isDefined(value: any): boolean {
  return value !== undefined && value !== null;
}

export function padNumber(value: number) {
  if (isNumber(value)) {
    return `0${value}`.slice(-2);
  } else {
    return '';
  }
}

export function regExpEscape(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export function toNgbDate(date: Date) {
  var dt = new Date(date);

  var day = dt.getDate();
  var month = dt.getMonth() + 1;
  var year = dt.getFullYear();

  return { year, month, day };
}

export function toDate(date: NgbDateStruct) {
  return new Date(`${date.year}/${date.month}/${date.day}`);
}

export function formatarData(data: Date, formato: string = 'dd/MM/yyyy') {
  if (data == null)
    return null;

  var pipe = new DatePipe('pt');

  return pipe.transform(data, formato);
}

export function checarSeDataAniversarioValida(date: Date) {
  var minhaData = new Date(date);
  var today = new Date();
  if (minhaData > today) {
    return false;
  }
  return true;
}