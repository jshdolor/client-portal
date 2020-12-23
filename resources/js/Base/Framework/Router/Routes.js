import {
    union,
    isEmpty,
} from '~/Framework/Helpers';


import BaseRoutes  from './Default';
class Routes extends BaseRoutes {

    constructor(routes) {
        super();
        if(isEmpty(routes)) {

            this.routes = [];

        } else {

            this.routes.push(routes);

        }


    }

    add(routes = []) {

        this.routes.push(routes);

    }


    /**
     * Return all registered routes including application
     * default routes
     * @returns {*}
     */
    getAll() {

        return union(this.routes, [this.defaultRoutes]);

    }

    /**
     * Same as method add but add prefix on all routes defined.
     * @param prefix
     * @param routes
     */
    withPrefix(prefix, routes) {

        this.add(
            routes.map(route => {
                route.path = prefix + '/' + route.path;
                return route;
            })
        );

    }

}

export default new Routes();
