import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidationsErrors {
  isValidField(form: FormGroup, field: string) {
    return form.controls[field].errors && form.controls[field].touched;
  }
}
