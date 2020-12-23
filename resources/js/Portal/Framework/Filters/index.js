import titleCase from '~/Framework/Filters/titleCase';

export default {
    install(Vue) {
        Vue.filter('titlecase', titleCase);
    },
};
