<template>

      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
<v-card class="elevation-12">
  <v-card-text>
      <DistrictSelection />
      </v-card-text>
    </v-card>
          </v-flex>
  </v-layout>
      </v-container>
</template>

<script>
import DistrictSelection from '@/components/DistrictSelection';

export default {
  name: 'Home',
  components: {
    DistrictSelection
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.centered-box {
  min-height: 100vh;

  display: flex;
  align-items: center;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
