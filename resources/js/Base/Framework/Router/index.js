import MiddlewareHandler from './MiddlewareHandler';

import VueRouter from 'vue-router';

import Routes from './Routes';
import RouteList from './RouteList';

import { each, union } from '~/Framework/Helpers';
import { Router as RouterConfig } from '~/Framework/Config';

class Router extends MiddlewareHandler {
    constructor(rootRoute = '/') {
        super();

        Vue.use(VueRouter);
        this.routes = [];
        this.routerInstance = null;
        this.register();

        this.rootRoute = rootRoute;
    }

    boot() {
        this.processRoutes().attachMiddlewares();

        const routerOptions = {
            base: this.rootRoute,
            mode: RouterConfig.ROUTER_MODE,
            routes: this.routes,
            linkActiveClass: RouterConfig.ROUTER_ACTIVE_CLASS,
            scrollBehavior: this.scrollBehavior,
        };

        this.routerInstance = new VueRouter(routerOptions);

        return this.routerInstance;
    }

    processRoutes() {
        each(Routes.getAll(), (route) => {
            this.routes = union(this.routes, route);
        });

        return this;
    }

    attachMiddlewares() {
        each(this.routes, (route) => {
            if (Array.isArray(route.middleware)) {
                route[RouterConfig.ROUTER_MIDDLEWARE_HANDLER] = this.handle(
                    route.middleware
                );
            }
        });

        return this;
    }

    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }

        if (to.meta.isModalRoute || from.meta.isModalRoute) {
            return false;
        }

        if (to.hash) {
            let counter = setInterval(() => {
                if (
                    !!Object.values(window.pageCallDone).reduce(
                        (output, value) => (output *= value),
                        true
                    )
                ) {
                    clearInterval(counter);
                    return window.scrollTo({
                        top: document.querySelector(to.hash).offsetTop,
                        behavior: 'smooth',
                    });
                }
            }, 100);
        } else {
            return { x: 0, y: 0 };
        }
    }

    register() {
        RouteList._exportPublic();
        return this;
    }
}

export default Router;
