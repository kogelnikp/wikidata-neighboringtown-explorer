<template>
  <v-combobox 
                :items="districts"
                item-text="label"
                item-value="key" 
                placeholder="Wähle einen Bezirk..."
                :value="district"
                @change="onDistrictSelected" />
</template>

<script>
import { mapGetters } from 'vuex';
import { FETCH_DISTRICTS } from '@/store/actions.type';

export default {
  name: 'DistrictSelection',
  created() {
    this.$store.dispatch(FETCH_DISTRICTS);
  },
  computed: {
    ...mapGetters(['districts', 'district']),

  },
  methods: {
    onDistrictSelected(e) {
      this.$router.push({ name: 'district', params: { districtid: e.key } })
    }
  }
}
</script>

<style>

</style>
