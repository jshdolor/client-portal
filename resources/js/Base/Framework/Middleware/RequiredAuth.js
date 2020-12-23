import Cookies from '~/Infrastructure/Cookies';

class RequiredAuth {

    static handle(to, from, next) {

        if (Cookies.get('Authorization')) {

            next();

        } else {

            next({ name: 'home-route' });

        }


    }


}

export default RequiredAuth;