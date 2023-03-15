import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[isbn-validator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: IsbnValidator, multi: true }]
})
export class IsbnValidator implements Validator {

  constructor() { }
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if (!control.value) return null
    if(control.value.length != 10 ) return { error: 'Length has to be 10'}
    const validationError = this.getIsbnValidationError(control.value)
    if(!validationError) return null
    return { error: validationError}
  }


  /// Eine gültige ISBN-Nummer besteht aus den Ziffern 0, ... , 9,
  /// 'x' oder 'X' (nur an der letzten Stelle)
  /// Die Gesamtlänge der ISBN beträgt 10 Zeichen.
  /// Für die Ermittlung der Prüfsumme werden die Ziffern
  /// von rechts nach links mit 1 - 10 multipliziert und die
  /// Produkte aufsummiert. Ist das rechte Zeichen ein x oder X
  /// wird als Zahlenwert 10 verwendet.
  /// Die Prüfsumme muss modulo 11 0 ergeben.
  /// <returns>Fehlermeldung oder Leerstring</returns>
  getIsbnValidationError(isbn: string): string {
    let weight = 10  // Startgewicht
    let sum = 0
    for (let index = 0; index < 10; index++) {
      let ch = isbn[index]
      let number = 0
      if (ch >= '0' && ch <= '9') {
        number = Number(ch)
      }
      else  // keine Ziffer  => x oder X an letzter Stelle
      {
        if (index != 9) {
          return 'Nur Ziffern und x an letzter Stelle erlaubt'
        }
        if (ch == 'x' || ch == 'X') {
          number = 10
        }
        else {
          return 'Nur x an letzter Stelle erlaubt'
        }
      }
      // zahl enthält gültigen Wert
      sum += number * weight
      weight--
    }
    if (sum % 11 != 0) {
      return `isbn checksum is ${sum % 11} (should be 0!")`
    }
    return ''
  }

}
