import titleCase from './titleCase';

export default {
    install(Vue) {
        Vue.filter('titlecase', titleCase);
    },
};
