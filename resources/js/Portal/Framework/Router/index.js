import BaseRouter from '~/Framework/Router';

import RouteList from '@portal/Framework/Router/RouteList';

class Router extends BaseRouter {
    register() {
        RouteList._exportPublic();
        return this;
    }
}

export default Router;
