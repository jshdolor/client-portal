import ClickOutside from '~/Framework/Plugins/Argon/Directives/ClickOutside';
import VueLazyload from 'vue-lazyload';
import AuthRequired from './AuthRequired';

import { VBPopover } from 'bootstrap-vue'
// Note: Vue automatically prefixes the directive name with 'v-'
 
export default class Directives {

    static register()
    {

        Vue.directive('click-outside', ClickOutside);
        Vue.directive('lazy', VueLazyload);
        Vue.directive('auth-required', AuthRequired);
        Vue.directive('b-popover', VBPopover)


    }

}