import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

import app from './App';
import intent from './Intent';
import localization from './Localization';
import session from './Session';
import gallery from './Gallery';
import profile from './Profile';

export default new Vuex.Store({
    modules: {
        app,
        intent,
        localization,
        session,
        gallery,
        profile,
    },
});
