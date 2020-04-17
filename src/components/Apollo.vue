<template>
  <div>
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
          <p class="title white--text">Choose a Make</p>
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
            <v-btn class="" dark color="red lighten-1" text @click="updateCart">
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
</template>

<script>
export default {
  data: () => ({
  }),
};
</script>

<style></style>
