<template>
<div>
    <v-navigation-drawer fixed clipped app v-model="inputValue">
      <v-toolbar flat color="white">
        <DistrictSelection />
      </v-toolbar>

      <v-divider></v-divider>

      <v-list dense class="pt-0">
        <v-list-tile
          v-for="municipality in municipalities" 
          :key="municipality.key"
          @click="onMunicipalitySelected(municipality)"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ municipality.label }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-fade-transition mode="out-in">
      <router-view></router-view>
    </v-fade-transition>
</div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import { FETCH_MUNICIPALITIES, FETCH_DISTRICT, FETCH_DISTRICTS } from "@/store/actions.type";
import DistrictSelection from '@/components/DistrictSelection';

export default {
  name: 'District',
  components: {
    DistrictSelection
  },
  watch: {
    '$route.params': {
      async handler() {
        await this.fetchData()
      },
      immediate: true,
    }
  },
  methods:{    
    ...mapMutations('app', ['setDrawer']),
    onMunicipalitySelected(municipality) {
      this.$router.push({
        name: 'municipality', 
        params: { 
          districtid: this.$route.params.districtid, 
          municipalityid: municipality.key
          }
        });
    },
    async fetchData() {
      await this.$store.dispatch(FETCH_DISTRICTS);
      this.$store.dispatch(FETCH_DISTRICT, this.$route.params.districtid);
      this.$store.dispatch(FETCH_MUNICIPALITIES, this.$route.params.districtid);
    }
  },
  computed: {
    ...mapState('app', ['drawer']),
    ...mapGetters(['district', 'municipalities']),
    inputValue: {
      get () {
        return this.drawer
      },
      set (val) {
        this.setDrawer(val)
      }
    }
  },
  async created() {
    this.fetchData();
  },
}
</script>

<style>

</style>
