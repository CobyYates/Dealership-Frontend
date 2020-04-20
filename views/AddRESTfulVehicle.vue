<template>
  <v-container>
    <template>
        <v-container>
            <v-skeleton-loader
                class="mx-auto"
                width="400"
                v-if="this.images == ''"
                type="image"
            ></v-skeleton-loader>
            <v-img v-else class="mx-auto" :src="images" width="400"></v-img>
        </v-container>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="6" class="mx-auto">
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
                      v-model="hp"
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
                  @click="addVehicle"
                  class="white--text"
                  >Add Vehicle</v-btn
                >
              </v-form>
              <snackbar :snackbar="this.snackbar" :message="this.message" />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </template>
  </v-container>
</template>

<script>
import axios from "axios";
import snackbar from '../src/components/Snackbar'
export default {
    components: {
        snackbar
    },
  data: function() {
    return {
      make: null,
      snackbar: false,
      message: null,
      model: null,
      year: null,
      topSpeed: null,
      hp: null,
      weight: null,
      engine: null,
      torque: null,
      sixty: null,
      price: null,
      loading: true,
      vtype: null,
      valid: false,
      four: "####",
      three: "###",
      float: "#.#",
      money: {
        decimal: ".",
        thousands: ",",
        precision: 0,
        masked: false,
      },
      images: null,
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
    addVehicle() {
    //   axios.post(`${process.env.VUE_APP_CREATE_VEHICLE}?&make=${this.make}&imageURL=${this.image}&model=${this.model}&torque=${this.torque}&engine=${this.engine}&sixty=${this.sixty}&topSpeed=${this.topSpeed}&hp=${this.hp}&weight=${this.weight}&year=${this.year}&price=${this.price}`);
        this.snackbar = true 
        this.message = 'Vehicle Added'
      axios.post(`https://dealership-restful.herokuapp.com/admin/add-product/?&make=${this.make}&model=${this.model}&torque=${this.torque}&engine=${this.engine}&sixty=${this.sixty}&topSpeed=${this.topSpeed}&hp=${this.hp}&weight=${this.weight}&year=${this.year}&price=${this.price}&imgURL=${this.images}`);
    },
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



https://dealership-restful.herokuapp.com/admin/add-product/?&make=Acura&model=sadf&torque=5165&engine=V4&sixty=5.1&topSpeed=123&hp=undefined&weight=561&year=2012&price=12.31