<template>
  <!-- <v-container class="mx-auto mt-12"> -->
  <v-container fluid>
    <v-parallax
      height="700"
      class="mb-8"
      src="https://www.carscoops.com/wp-content/uploads/webp/2020/03/Armytrix-McLaren-650S-.webp">
      <v-overlay absolute>
        <div class="d-flex align-end justify-center">
          <v-col cols="6">
            <p class="display-3 font-weight-medium white--text text-center">
              Vehicles fetched from a RESTful API by Coby Yates
            </p>
          </v-col>
        </div>
      </v-overlay>
    </v-parallax>

    <v-container>
      <v-row v-if="this.vehicles !== null" class="mb-12">
        <v-col
          cols="3"
          v-for="vehicle in vehicles"
          :key="vehicle.i"
          class="text-center"
        >
          <v-card
            dark
            class="mx-2 d-flex flex-column justify-space-between"
            width="350"
            height="340"
          >
            <v-card-text>
              <p class="headline">{{ vehicle.make }} {{ vehicle.model }}</p>
              <p class="title">${{ vehicle.price }}</p>
              <div class="text--primary">
                <v-row>
                  <v-col class="text-right">
                    <h3>Power:</h3>
                    <h3>Torque:</h3>
                    <h3>Engine:</h3>
                    <h3>0-60:</h3>
                    <h3>Top Speed:</h3>
                    <h3>Weight:</h3>
                  </v-col>
                  <v-col class="text-left">
                    <h3>{{ vehicle.hp }} hp</h3>
                    <h3>{{ vehicle.torque }} foot lbs</h3>
                    <h3>{{ vehicle.engine }}</h3>
                    <h3>{{ vehicle.sixty }} seconds</h3>
                    <h3>{{ vehicle.topSpeed }} mph</h3>
                    <h3>{{ vehicle.weight }} lbs</h3>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="red lighten-1"
                @click="viewProduct(vehicle._id)"
              >
                View
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "RESTful",
  data: () => ({
    vehicles: null,
  }),
  methods: {
    viewProduct(id) {
      this.$router.replace("/vehicle/" + id);
    },
  },
  mounted() {
    axios.get(process.env.VUE_APP_ALL).then((response) => {
      this.vehicles = response.data;
    });
  },
};
</script>

<style scoped>
p,
h3 {
  color: white;
}

.overlay {
  background-color: rgba(15, 15, 15, 0.63);
  height: 650px;
  width: 100vw;
}
</style>
