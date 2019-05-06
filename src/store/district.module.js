import WikidataService from '@/services/wikidata.service';
import { FETCH_MUNICIPALITIES, FETCH_DISTRICT } from './actions.type';
import {
  FETCH_START,
  FETCH_MUNICIPALITIES_END,
  SET_DISTRICT
} from "./mutations.type";

const state = {
  district: undefined,
  municipalities: [],
  isLoadingMunicipalities: true
};

const getters = {
  district(state) {
    return state.district;
  },
  municipalities(state) {
    return state.municipalities;
  },
  isLoadingMunicipalities(state) {
    return state.isLoadingMunicipalities;
  }
};

const actions = {
  [FETCH_MUNICIPALITIES]({ commit }, districtKey) {
    commit(FETCH_START);
    return WikidataService.getMunicipalitiesInDistrict(districtKey)
      .then((data) => {
        const sortedData = data.sort((a,b) => a.label.localeCompare(b.label));
        commit(FETCH_MUNICIPALITIES_END, sortedData);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  [FETCH_DISTRICT]({ commit, rootState }, districtKey) {
    let district = rootState.home.districts.filter(x => x.key === districtKey);
    if (district.length === 1) {
      commit(SET_DISTRICT, district[0]);
    } else {
      throw new Error('District could not be found!');
    }
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  [FETCH_START](state) {
    state.isLoadingMunicipalities = true;
  },
  [FETCH_MUNICIPALITIES_END](state, municipalities) {
    state.municipalities = municipalities;
    state.isLoadingMunicipalities = false;
  },
  [SET_DISTRICT](state, district) {
    state.district = district;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};