import { required, email, integer, confirmed } from 'vee-validate/dist/rules';
import { extend, setInteractionMode } from 'vee-validate';

setInteractionMode('eager');

extend('required', {
    ...required,
    message: '{_field_} can not be empty',
});

extend('email', {
    ...email,
    message: 'Email must be valid',
});

extend('integer', {
    ...integer,
    message: '{_field_} must be number',
});

extend('confirmed', {
    ...confirmed,
    message: '{_field_} not the same with the given password',
});
