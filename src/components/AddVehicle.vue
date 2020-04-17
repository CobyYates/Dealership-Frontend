<template>
  <ApolloMutation
    :mutation="require('../graphql/AddVehicle.gql')"
    :variables="{
      make,
      model,
      year,
      topSpeed,
      power,
      weight,
      engine,
      torque,
      sixty,
      price,
      vtype,
    }"
    @done="onDone"
  >
    <template v-slot="{ mutate, loading, error }">
      <v-img :src="images" width="400"></v-img>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="10" class="mx-auto">
              <v-text-field
                v-model="images"
                solo
                dense
                label="Image URL"
              ></v-text-field>
              <v-form v-model="valid">
                <v-row>
                  <v-col cols="6">
                    <v-select
                      v-model="year"
                      dense
                      solo
                      :items="years"
                      label="year*"
                      :rules="yearRules"
                    ></v-select>
                    <v-autocomplete
                      v-model="make"
                      :items="$store.state.makes"
                      :search-input.sync="search"
                      cache-items
                      dense
                      hide-no-data
                      label="make*"
                      solo
                    ></v-autocomplete>
                    <v-text-field
                      v-model="model"
                      solo
                      dense
                      label="model*"
                      :rules="modelRules"
                    ></v-text-field>
                    <v-text-field
                      v-model="price"
                      solo
                      dense
                      v-money="money"
                      prefix="$"
                      label="price"
                    ></v-text-field>
                    <v-text-field
                      v-model="power"
                      solo
                      v-mask="four"
                      dense
                      suffix="/hp"
                      label="hp"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-select
                      v-model="engine"
                      dense
                      solo
                      :items="engines"
                      label="engine"
                    ></v-select>
                    <v-select
                      v-model="vtype"
                      dense
                      solo
                      :items="types"
                      label="type"
                    ></v-select>
                    <v-text-field
                      v-model="topSpeed"
                      solo
                      v-mask="three"
                      dense
                      suffix="/mph"
                      label="top speed"
                    ></v-text-field>
                    <v-text-field
                      v-model="weight"
                      v-mask="four"
                      solo
                      dense
                      suffix="/lbs"
                      label="weight"
                    ></v-text-field>
                    <v-text-field
                      v-model="torque"
                      v-mask="four"
                      solo
                      dense
                      suffix="/ft lbs"
                      label="torque"
                    ></v-text-field>
                    <v-text-field
                      v-model="sixty"
                      solo
                      dense
                      suffix="/seconds"
                      v-mask="float"
                      label="0-60 (ex. 2.4)"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-btn
                  large
                  primary
                  :disabled="loading"
                  color="red"
                  class="white--text"
                  @click="mutate()"
                  >Add Vehicle</v-btn>
                <p v-if="error">An error occured: {{ error }}</p>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </template>
  </ApolloMutation>
</template>

<script>
export default {
  data: function() {
    return {
      make: null,
      model: null,
      year: null,
      topSpeed: null,
      power: null,
      weight: null,
      engine: null,
      torque: null,
      sixty: null,
      price: null,
      vtype: null,
      valid: false,
      four: "####",
      three: "###",
      float: "#.#",
      money: {
        decimal: ".",
        thousands: ",",
        precision: 2,
        masked: false,
      },
      images: "",
      years: [
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
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
  },
  methods: {
    querySelections(v) {
      this.loading = true;
      setTimeout(() => {
        this.items = this.$store.state.makes.filter((e) => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },
    onDone() {
      return console.log("Done");
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
