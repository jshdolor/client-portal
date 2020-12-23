import App from '@portal/Framework/Components/Application';
import Store from '@portal/Framework/Store';
import Router from '@portal/Framework/Router';
// import Directives from '~/Framework/Components/Directives';

import Filters from '@portal/Framework/Filters';

import vuetify from '@portal/Framework/Plugins/vuetify';
import '@portal/Framework/Plugins';

// validation
import '~/Infrastructure/Validation/config';

import { ValidationProvider, ValidationObserver } from 'vee-validate';

import 'leaflet/dist/leaflet.css';

class Bootstrap {
    init() {
        // Directives.register();
        window.Store = Store;
        window.tries = 0;

        Vue.component('ValidationProvider', ValidationProvider);
        Vue.component('ValidationObserver', ValidationObserver);
        Vue.use(Filters);

        const app = new Vue({
            vuetify,
            router: new Router('/portal').boot(),
            render: (h) => {
                return h(App);
            },
            store: Store,
        });

        app.$mount('#main');

        window.portalRoot = app;
    }
}

export default Bootstrap;
