<template>
  <v-content>
    <v-row>
      <VehicleCard />
    </v-row>
  </v-content>
</template>

<script>
import VehicleCard from './VehiclesCard'
export default {
  components: {
    VehicleCard
  },
  data: () => ({
  }),
};
</script>

<style>
h3 {
  font-weight: 400;
}
</style>
