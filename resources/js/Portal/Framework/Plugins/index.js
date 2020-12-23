import Vue from 'vue';

import { VueMasonryPlugin } from 'vue-masonry';

import ListCard from '~/Framework/Components/Widgets/Card/ListCard';

Vue.use(VueMasonryPlugin);
Vue.component('ListCard', ListCard);

export default Vue;
