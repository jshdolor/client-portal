module.exports = {
    required: (v) => !!v || ' is required',
    email: (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
};
