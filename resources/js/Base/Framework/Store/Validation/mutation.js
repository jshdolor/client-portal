export default {
    setValidationErrors(state, data) {
        state.errors = { ...state, ...data };
    },
};
