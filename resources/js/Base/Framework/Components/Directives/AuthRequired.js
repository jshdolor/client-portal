import Cookies from '~/Infrastructure/Cookies';

export default {
    bind : (el, binding, vnode) => {

        el.addEventListener('click', () => {
            
            if(vnode.context.$store.state.session.isLoggedIn) {
                return true;
            }

            if(el.hasAttribute('signup')) {
                vnode.context.$store.dispatch('intent/showSignupModal', true);
                return true;
            }

            vnode.context.$store.dispatch('intent/showLoginModal', true);
        });

    }
};