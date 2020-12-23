import App from '@dashboard/Framework/Components/Application';
import Store from '@dashboard/Framework/Store';
import Router from '@dashboard/Framework/Router';
// import Directives from '~/Framework/Components/Directives';
import vuetify from '@portal/Framework/Plugins/vuetify';

class Bootstrap {
    init() {
        // Directives.register();
        window.Store = Store;
        window.tries = 0;

        Vue.prototype.$access = {
            access_id,
            add_employee,
            remove_employee,
            edit_employee,
            view_employee,
            manage_tcu_app,
        };

        let app = new Vue({
            vuetify,
            router: new Router().boot(),
            render: (h) => {
                return h(App);
            },
            store: Store,
        });

        app.$mount('#main');
    }
}

export default Bootstrap;
