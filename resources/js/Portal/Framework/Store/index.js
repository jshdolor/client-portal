import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

import session from '~/Framework/Store/Session';
import user from '~/Framework/Store/User';
import sitesUser from '~/Framework/Store/Sites/User';
import validation from '~/Framework/Store/Validation';

import intent from '@portal/Framework/Store/Intent';

export default new Vuex.Store({
    modules: {
        session,
        user,
        intent,
        sitesUser,
        validation,
    },
});
