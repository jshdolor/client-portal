import AppRoutes from './AppRoutes';

export default class RouteExporter {
    static _exportPublic() {
        return {
            AppRoutes: new AppRoutes(),
        };
    }
}
