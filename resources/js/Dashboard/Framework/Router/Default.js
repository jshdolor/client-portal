

class BaseRoutes {

    constructor() {

        this.defaultRoutes = [
            {
                path : '*',
                name : 'not-found',
                component : () => import('~/Framework/Components/System/NotFound')
            }
        ];

    }

}
export default BaseRoutes;