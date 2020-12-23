import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import { primaryColor } from '~/Application/Config';

Vue.use(Vuetify);

const opts = {
    theme: {
        themes: {
            light: {
                primary: primaryColor,
            },
        },
    },
    defaultAssets: false,
};

export default new Vuetify(opts);
