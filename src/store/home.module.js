import WikidataService from '@/services/wikidata.service';
import { FETCH_DISTRICTS } from './actions.type';
import {
  FETCH_START,
  FETCH_DISTRICTS_END
} from "./mutations.type";

const state = {
  districts: [],
  currentDistrict: undefined,
  isLoadingDistricts: true
};

const getters = {
  districts(state) {
    return state.districts;
  },
  isLoadingDistricts(state) {
    return state.isLoadingDistricts;
  }
};

const actions = {
  [FETCH_DISTRICTS]({ commit }) {
    commit(FETCH_START);
    return WikidataService.getDistrictsInAustria()
      .then((data) => {
        const sortedData = data.sort((a,b) => a.label.localeCompare(b.label));
        commit(FETCH_DISTRICTS_END, sortedData);
      })
      .catch(error => {
        throw new Error(error);
      });
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  [FETCH_START](state) {
    state.isLoadingDistricts = true;
  },
  [FETCH_DISTRICTS_END](state, districts) {
    state.districts = districts;
    state.isLoadingDistricts = false;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};