import Vue from 'vue';
import Vuex from 'vuex';

import main from './modules/main.js';
import user from './modules/user';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    main,
    user,
  },
});
