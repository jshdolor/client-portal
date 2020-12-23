import Vue from 'vue';
import axios from 'axios';
import Boot from '@dashboard/Framework/Bootstrap';

window.GlobalEvent = new Vue();
window.Vue = Vue;

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.App = new Boot();
window.addEventListener('load', function() {
    App.init();
});
