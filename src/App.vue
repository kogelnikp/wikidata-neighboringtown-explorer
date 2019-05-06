<template>
  <v-app>
    <v-toolbar app dense fixed clipped-left>
      <v-toolbar-title class="headline text-uppercase">
        <router-link :to="{name: 'home'}" class="nolink">
        <span>NACHBARGEMEINDEN</span>
        <span class="font-weight-light">EXPLORER</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon 
        flat
        href="https://github.com/kogelnikp/wikidata-neighboringtown-explorer"
        target="_blank"
      >
        <v-img class="toolbar-icon" :src="require('./assets/GitHub-Mark-64px.png')" />
      </v-btn>
    </v-toolbar>

    <v-content>      
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      //
    }
  }
}
</script>

<style scoped>
.nolink {
  text-decoration: none;
  color: black;
}

</style>
