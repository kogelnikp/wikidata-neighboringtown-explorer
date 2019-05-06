<template>
  <v-card 
      max-width="700"
      class="mx-auto">
      <v-card-title class="display-2">{{municipality.label}}</v-card-title>

        <v-list>
          <v-subheader>Vorhandene Nachbarn in Wikidata</v-subheader>  
          <v-list-tile v-if="isWikidataNeighborsLoading">
            <v-progress-circular 
              indeterminate
              color="black"
            ></v-progress-circular>    
          </v-list-tile>
          
          <v-list-tile v-for="neighbor in wikidataNeighbors" v-bind:key="neighbor.key">
            <v-list-tile-content>{{neighbor.label}}</v-list-tile-content>
          </v-list-tile>        
        </v-list>
    
        <v-list>
          <v-subheader>Vorschläge für Nachbarn aus Wikipedia</v-subheader> 
          <v-list-tile v-if="isWikipediaNeighborsLoading">
            <v-progress-circular 
              indeterminate
              color="black"
            ></v-progress-circular>    
          </v-list-tile>
          <v-list-tile v-for="neighbor in suggestedNeighbors" v-bind:key="neighbor.key">
            <v-list-tile-content>{{neighbor.label}}</v-list-tile-content>
          </v-list-tile>
        </v-list>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { FETCH_WIKIDATA_NEIGHBORS, FETCH_WIKIPEDIA_NEIGHBORS, FETCH_MUNICIPALITY } from "@/store/actions.type";

export default {
  name: 'Municipality',
  computed: {
    ...mapGetters(['wikipediaNeighbors', 'wikidataNeighbors', 'municipality', 'isWikidataNeighborsLoading', 'isWikipediaNeighborsLoading']),
    suggestedNeighbors() {
      let suggestions = [];
      if(!this.isWikidataNeighborsLoading && !this.isWikipediaNeighborsLoading) {
        for (let wikiNeighbor of this.wikipediaNeighbors) {
          let foundOnWikidata = false;
          for (let neighbor of this.wikidataNeighbors) {
            if(neighbor.key === wikiNeighbor.key) {
              foundOnWikidata = true;
            }
          }
          if(!foundOnWikidata) {
            suggestions.push(wikiNeighbor);
          }
        }      
      }
      return suggestions;
    }
  },
  watch: {
    '$route.params': {
      async handler() {
        await this.fetchData()
      },
      immediate: true,
    }
  },
  methods: {
    async fetchData() {
      await this.$store.dispatch(FETCH_MUNICIPALITY, this.$route.params.municipalityid);
      this.$store.dispatch(FETCH_WIKIDATA_NEIGHBORS, this.municipality.key);
      this.$store.dispatch(FETCH_WIKIPEDIA_NEIGHBORS, this.municipality.wikipediaUrl);
    }
  },
  async mounted() {
    
  },
}
</script>

<style>

</style>
