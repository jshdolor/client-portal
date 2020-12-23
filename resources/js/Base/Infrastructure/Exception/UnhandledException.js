class UnhandledException {
    constructor({ error = {}, message = 'An error has occured' } = {}) {
        this.error = error;
        const errMessage = error?.error?.message || message;
        return this.setErrorMessages(errMessage);
    }

    setErrorMessages(message) {
        window.portalRoot.$root.$emit('showMessage', message, true);
    }
}

export default UnhandledException;
