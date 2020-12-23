import Store from '@portal/Framework/Store';

class ValidationException {
    constructor({ error, errorNS }) {
        this.error = error;
        this.errorNS = errorNS;
        console.log('called');
        return this.setErrorMessages();
    }

    setErrorMessages() {
        const messages = this.error?.error?.message;
        const errors = {};
        for (let key in messages) {
            errors[key] = messages[key][0];
        }

        Store.dispatch('validation/setValidationErrors', {
            [this.errorNS]: errors,
        });
    }
}

export default ValidationException;
