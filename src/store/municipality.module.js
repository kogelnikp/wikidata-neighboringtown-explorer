import WikidataService from '@/services/wikidata.service';
import WikipediaService from '@/services/wikipedia.service';
import { 
  FETCH_WIKIDATA_NEIGHBORS, 
  FETCH_WIKIPEDIA_NEIGHBORS,
  FETCH_MUNICIPALITY
} from './actions.type';
import {
  FETCH_WIKIDATA_NEIGHBORS_END,
  FETCH_WIKIPEDIA_NEIGHBORS_END,
  FETCH_WIKIDATA_NEIGHBORS_START,
  FETCH_WIKIPEDIA_NEIGHBORS_START,
  SET_MUNICIPALITY
} from "./mutations.type";

const state = {
  wikidataNeighbors: [],
  wikipediaNeighbors: [],
  municipality: {key:undefined, label:undefined},
  isWikidataNeighborsLoading: false,
  isWikipediaNeighborsLoading: false,
};

const getters = {
  wikidataNeighbors(state) {
    return state.wikidataNeighbors;
  },
  wikipediaNeighbors(state) {
    return state.wikipediaNeighbors;
  },
  municipality(state) {
    return state.municipality;
  },
  isWikidataNeighborsLoading(state) {
    return state.isWikidataNeighborsLoading
  },
  isWikipediaNeighborsLoading(state) {
    return state.isWikipediaNeighborsLoading
  }
};

const actions = {
  [FETCH_MUNICIPALITY]({ commit }, municipalityKey) {
    return WikidataService.getMunicipality(municipalityKey)
      .then((data) => {
        commit(SET_MUNICIPALITY, data);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  [FETCH_WIKIDATA_NEIGHBORS]({ commit }, municipalityKey) {
    commit(FETCH_WIKIDATA_NEIGHBORS_START);
    return WikidataService.getNeighborsOfMunicipality(municipalityKey)
      .then((data) => {
        const sortedData = data.sort((a,b) => a.label.localeCompare(b.label));
        commit(FETCH_WIKIDATA_NEIGHBORS_END, sortedData);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  [FETCH_WIKIPEDIA_NEIGHBORS]({ commit }, wikipediaUrl) {
    commit(FETCH_WIKIPEDIA_NEIGHBORS_START);
    return WikipediaService.getNeighborsFromWikiPage(wikipediaUrl)
      .then((data) => {
        const sortedData = data.sort((a,b) => a.label.localeCompare(b.label));
        commit(FETCH_WIKIPEDIA_NEIGHBORS_END, sortedData);
      })
      .catch(error => {
        throw new Error(error);
      });
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  [FETCH_WIKIPEDIA_NEIGHBORS_START](state) {
    state.isWikipediaNeighborsLoading = true;
    state.wikipediaNeighbors = []
  },  
  [FETCH_WIKIPEDIA_NEIGHBORS_END](state, wikipediaNeighbors) {
    state.wikipediaNeighbors = wikipediaNeighbors;
    state.isWikipediaNeighborsLoading = false;
  },  
  [FETCH_WIKIDATA_NEIGHBORS_START](state) {
    state.isWikipediaNeighborsLoading = true;
    state.wikidataNeighbors = []
  },  
  [FETCH_WIKIDATA_NEIGHBORS_END](state, wikidataNeighbors) {
    state.wikidataNeighbors = wikidataNeighbors;
    state.isWikipediaNeighborsLoading = false;
  },  
  [SET_MUNICIPALITY](state, municipality) {
    state.municipality = municipality;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};