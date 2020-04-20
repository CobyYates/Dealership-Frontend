<template>
  <ApolloMutation
    :mutation="require('../src/graphql/UpdateVehicle.gql')"
    :variables="{
      id: id,
      make: this.vehicle.make,
      model: this.vehicle.model,
      year: this.vehicle.year,
      topSpeed: this.vehicle.topSpeed,
      power: this.vehicle.power,
      image: this.vehicle.image,
      weight: this.vehicle.weight,
      engine: this.vehicle.engine,
      torque: this.vehicle.torque,
      sixty: this.vehicle.sixty,
      price: this.vehicle.price,
      vtype: this.vehicle.vtype,
    }"
  >
    <template v-slot="{ mutate, loading, error }">
      <v-row>
        <v-col xs="12" sm="11" md="8" lg="7" xl="6" class="mx-auto">
          <v-row>
            <v-col cols="8" class="mx-auto mb-8">
              <v-img :src="vehicle.image" max-height="500"></v-img>
            </v-col>
          </v-row>
          <form>
            <v-row>
              <v-col cols="12" xs="12" sm="6" md="6">
                <v-select
                  v-model="vehicle.year"
                  dense
                  solo
                  :items="years"
                  label="year"
                  :rules="yearRules"
                ></v-select>
                <v-autocomplete
                  v-model="vehicle.make"
                  :items="$store.state.makes"
                  :search-input.sync="search"
                  cache-items
                  dense
                  hide-no-data
                  label="make*"
                  solo
                ></v-autocomplete>
                <v-text-field
                  v-model="vehicle.model"
                  solo
                  dense
                  label="model*"
                  :rules="modelRules"
                ></v-text-field>
                <v-text-field
                  v-model="vehicle.price"
                  solo
                  dense
                  v-money="money"
                  prefix="$"
                  label="price"
                ></v-text-field>
                <v-text-field
                  v-model="vehicle.hp"
                  solo
                  v-mask="four"
                  dense
                  suffix="/hp"
                  label="hp"
                ></v-text-field>
              </v-col>
              <v-col cols="12" xs="12" sm="6" md="6">
                <v-select
                  v-model="vehicle.engine"
                  dense
                  solo
                  :items="engines"
                  label="engine"
                ></v-select>
                <v-text-field
                  v-model="vehicle.topSpeed"
                  solo
                  v-mask="three"
                  dense
                  suffix="/mph"
                  label="top speed"
                ></v-text-field>
                <v-text-field
                  v-model="vehicle.weight"
                  v-mask="four"
                  solo
                  dense
                  suffix="/lbs"
                  label="weight"
                ></v-text-field>
                <v-text-field
                  v-model="vehicle.torque"
                  v-mask="four"
                  solo
                  dense
                  suffix="/ft lbs"
                  label="torque"
                ></v-text-field>
                <v-text-field
                  v-model="vehicle.sixty"
                  solo
                  dense
                  suffix="/seconds"
                  v-mask="float"
                  label="0-60 (ex. 2.4)"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="text-center">
              <v-col>
                <v-btn
                  large
                  primary
                  type="submit"
                  :disabled="loading"
                  color="red"
                  @click="mutate()"
                  class="white--text mb-12"
                  >Add Vehicle
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  large
                  primary
                  type="submit"
                  :disabled="loading"
                  color="red"
                  @click="deleteVehicle"
                  class="white--text mb-12"
                  >DELETE VEHICLE
                </v-btn>
              </v-col>
            </v-row>
          </form>
          <p v-if="error">An error occurred: {{ error }}</p>
        </v-col>
      </v-row>
    </template>
  </ApolloMutation>
</template>

<script>
import DELETE_VEHICLE from '../src/graphql/RemoveVehicle.gql'
export default {
  data() {
    return {
      id: this.$route.params.id,
      vehicle: this.$store.state.editedVehicle,
      valid: false,
      four: "####",
      three: "###",
      float: "#.#",
      money: {
        decimal: "",
        thousands: ",",
        precision: 0,
        masked: false,
      },
      images: null,
      years: [
        "year",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
      ],
      items: [],
      search: null,
      select: null,
      engines: ["V4", "V6", "V8", "V10", "V12", "W16", "Electric"],
      types: ["Car", "SUV", "Truck"],
      users: [],
      makeRules: [(v) => !!v || "Make is required"],
      yearRules: [(v) => !!v || "Year is required"],
      modelRules: [(v) => !!v || "Model is required"],
    };
  },
  methods: {
      async deleteVehicle() {
        await this.$apollo.mutate({
          mutation: DELETE_VEHICLE,
          variables: {
            id: this.id
          }
        })
        await this.$router.replace('/')
    },
    querySelections(v) {
      setTimeout(() => {
        this.items = this.$store.state.makes.filter((e) => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
      }, 500);
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style></style>
