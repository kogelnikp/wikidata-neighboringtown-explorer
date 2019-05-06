import Vue from "vue";
import Vuex from "vuex";

import home from "./home.module";
import district from "./district.module";
import municipality from "./municipality.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home, 
    district,
    municipality
  }
});