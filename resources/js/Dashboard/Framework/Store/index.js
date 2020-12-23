import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

import session from '~/Framework/Store/Session';
import user from '~/Framework/Store/User';

export default new Vuex.Store({
    modules: {
        session,
        user,
    },
});
