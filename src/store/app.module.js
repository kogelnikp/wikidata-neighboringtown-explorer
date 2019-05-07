import { toggle, set } from '@/util/vuex'
import {
  SET_DRAWER,
  TOGGLE_DRAWER
} from "./mutations.type";

export default {
  namespaced: true,

  mutations: {
    [SET_DRAWER]: set('drawer'),
    [TOGGLE_DRAWER]: toggle('drawer')
  },

  state: {
    drawer: null,
    currentVersion: null,
    isLoading: false,
    releases: [],
    supporters: {}
  }
}