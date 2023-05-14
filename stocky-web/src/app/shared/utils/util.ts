import { FormGroup } from '@angular/forms';

export function validateControls(form: FormGroup): boolean {
    if (form && form.controls) {
        let isFormInvalid = form.invalid;
        if (isFormInvalid) {
            Object.keys(form.controls).forEach((key) => {
                if (key) {
                    form.get(`${key}`)?.markAsDirty();
                    form.get(`${key}`)?.updateValueAndValidity();
                }
            });
        }
        return isFormInvalid;
    }
    return false;
}
