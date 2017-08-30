
import {FormControl} from "@angular/forms";
export class CustomValidators {
    static emailValidator(control: FormControl){
        if(!control.value || control.value==='')
            return null;
        var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var valid = regEx.test(control.value);
        return valid ? null : { email: true };
    }

    static positiveValidator(control: FormControl){
        if(!control.value || control.value==='')
            return null;
        var valid = control.value > 0;
        return valid ? null : { email: true };
    }
    static confirmValidator(control: FormControl,other:FormControl){
        if(!control.value || control.value==='')
            return null;
        if(!other.value || other.value==='')
            return null;
        let valid = control.value === other.value;
        return valid ? null : { confirmed : true };
    }
}
