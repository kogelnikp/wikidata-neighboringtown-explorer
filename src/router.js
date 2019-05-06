import Vue from "vue";
import Router from "vue-router";

import Home from './views/Home';
import District from './views/District';
import Municipality from './views/Municipality';

Vue.use(Router);

export const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/districts/:districtid",
      name: "district",
      component: District,
      children: [
        {
          path: "municipalities/:municipalityid",
          name: "municipality",
          component: Municipality
        }
      ]
    },
  ]
  });