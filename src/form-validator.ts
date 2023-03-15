import { FormControl } from "@angular/forms";

export class FormValidator {
  static checkPreview(control: FormControl) {
    const checkValue = control.value;

    if(checkValue.length <= 0) return {checkPreview: {valid:false}}
    if(checkValue.length > 1200) return {checkPreview: {valid:false}}

    return null;
  }
}
