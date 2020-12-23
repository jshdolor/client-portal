import * as Middlewares from '../Middleware';
import {
    isUndefined
} from '~/Framework/Helpers';


class MiddlewareHandler {

    /**
     *
     * @param middlewares
     * @returns {function(*=, *=, *=)}
     */
    handle(middlewares = []) {
        return  (from, to, next) => {
            this.iterate(middlewares, from, to, next, 0);
        };
    }

    /**
     * Iterate through collection of Middlewares defined from Middlewares import
     * by default its in 'Application/Middleware/Imports.js'
     * and attempt to call (handle) method.
     * @param middleware
     * @param from
     * @param to
     * @param lastNext
     * @param i
     * @returns {boolean}
     */
    iterate(middleware, from, to, lastNext, i) {

        if(isUndefined(Middlewares[middleware[i]])) {

            if(! isUndefined(middleware[i + 1])) {

                this.iterate(middleware, from, to, lastNext, i + 1);
                return false;

            }

            lastNext();
            return false;

        }

        let guard = Middlewares[middleware[i]].handle;

        if (middleware.length === i + 1) {

            guard(from, to, lastNext);

        } else {

            guard(from, to,  (nextArg) => {

                switch (typeof (nextArg)) {

                case 'undefined':
                    this.iterate(middleware, from, to, lastNext, i + 1);
                    break;

                case 'object':
                    lastNext(nextArg);
                    break;

                case 'boolean':
                    lastNext(nextArg);
                    break;

                case 'string':
                    lastNext(nextArg);
                    break;

                }
            });
        }
    }
}
export default MiddlewareHandler;