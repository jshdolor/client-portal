import { titleCase } from "~/Framework/Helpers/String";

let replaceAdditionalParams = (error,params, field) => {
    
    field = titleCase(field, ['_']);
    let loc = window.Store.state.localization.active || {};
    let message = loc[error] || `tns.${error}`;

    if(error === "minLength") {
        message = message.replace(":min", params.min);
    }

    message = message.replace(":attribute", field)

    return message;
}

let getErrorMsg = ($vuelidate, field) => {
    let {error, params} = getError($vuelidate);
    
    let message = replaceAdditionalParams(error,params, field);

    return message;
};

let getError = $v => {
    let errors = Object.keys($v).filter(k => k[0] !== "$");
    
    errors = errors.filter(error => {
        return !$v[error];
    });


    let errorObj = {
        error: errors[0],
        params: $v.$params[errors[0]]
    };

    if (errors.length > 0) {
        return errorObj;
    }
    
    throw "validation issue";
};

let validate = $vDataBundle => {
    let validObj = {};
    
    for (let k in $vDataBundle) {
        validObj[k] = {
            input: true,
            message: null
        };
    }
    
    for (let formKey in validObj) {
        if (!$vDataBundle[formKey].$dirty) {
            validObj[formKey].input = null;
        } else {
            if ($vDataBundle[formKey].$error) {
                validObj[formKey].input = false;
                validObj[formKey].message = getErrorMsg($vDataBundle[formKey], formKey);
            }
        }
    }
    
    return validObj;
};

export { 
    getErrorMsg,
    validate
};
