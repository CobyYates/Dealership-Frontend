<template>
  <!-- Apollo watched Graphql query -->
  <!-- <ApolloQuery :query="require('../graphql/AllVehicles.gql')" -->
  <ApolloQuery
    :query="require('../graphql/AllVehicles.gql')"
    :variables="{ searchString }"
  >
    <!-- :variables="{ searchString }"> -->
    <template v-slot="{ result: { loading, error, data } }">
      <!-- Loading -->
      <div v-if="loading" class="loading apollo">Loading...</div>

      <!-- Error -->
      <div v-else-if="error" class="error apollo">An error occured</div>

      <!-- Result -->
      <div v-else-if="data" class="result apollo">
        <v-parallax
          height="700"
          src="https://www.carscoops.com/wp-content/uploads/webp/2020/03/Armytrix-McLaren-650S-.webp"
        >
          <v-overlay absolute>
            <div class="d-flex align-end justify-center">
              <v-col cols="6">
                <p class="display-3 font-weight-medium white--text text-center">
                  Vehicles fetched from a GraphQL API by Coby Yates
                </p>
              </v-col>
            </div>
          </v-overlay>
        </v-parallax>
        <div class="d-flex flex-column searchSection mb-10">
          <v-row>
            <v-col cols="3" class="mx-auto mt-8 d-flex flex-column justify-center">
              <p class="title white--text" >Choose a Make</p>
              <v-select
                :items="$store.state.makes"
                label="Select Make of Vehicle"
                solo
                v-model="searchString"
              ></v-select>
            </v-col>
          </v-row>
        </div>
        <v-row class="ml-12" id="setWidth">
          <v-col cols="3" v-for="(car, i) in data.Vehicles" :key="i">
            <v-card width="400" min-width="400">
              <v-card-title class="d-flex justify-center">
                <span class="headline"
                  >{{ car.year }} {{ car.make }} {{ car.model }}
                  <span class="title font-weight-light"
                    >({{ car.vtype.toUpperCase() }})</span
                  ></span
                >
              </v-card-title>
              <v-card-text>
                <v-img :src="car.image"></v-img>
                <p class="text-center title mt-4">Details for this vehicle</p>
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
                    <h3>{{ car.power }} hp</h3>
                    <h3>{{ car.torque }} foot lbs</h3>
                    <h3>{{ car.engine }}</h3>
                    <h3>{{ car.sixty }} seconds</h3>
                    <h3>{{ car.top_speed }} mph</h3>
                    <h3>{{ car.weight }} lbs</h3>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-around">
                <v-btn
                  class=""
                  dark
                  color="red lighten-1"
                  text
                  @click="updateCart"
                >
                  <v-icon left>mdi-cart-outline</v-icon> Add to cart
                </v-btn>
                <v-btn color="green darken-1" text @click="dialog = false"
                  >View Vehicle</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- No result -->
      <div v-else class="no-result apollo">
        <center>
          <v-row>
            <v-col>
              <p>Loading Vehicles from GraphQL</p>
              <v-progress-circular
                :size="80"
                :width="7"
                color="red"
                indeterminate
              ></v-progress-circular>
            </v-col>
          </v-row>
        </center>
      </div>
    </template>
  </ApolloQuery>
</template>

<script>
//import vue-truncate-filter from 'vue-truncate-filter'
export default {
  data: () => ({
    searchString: "",
  }),
  methods: {
    updateCart(vehicle) {
      console.log(vehicle);
      this.$store.state.cartItems++;
      this.$store.state.showCartItems = true;
      this.$store.state.vehicles.push(vehicle);
      console.log(this.$store.state.vehicles);
    },
  },
};
</script>

<style scoped>
#setWidth {
  min-width: 100vw;
  min-height: 100vh;
}

.searchSection {
  background: rgb(0, 0, 0);
  background: linear-gradient(
    140deg,
    rgb(48, 48, 48) 0%,
    rgba(34, 34, 34, 1) 52%,
    rgba(9, 9, 9, 0.9023984593837535) 100%
  );
  height: 200px;
}
</style>
