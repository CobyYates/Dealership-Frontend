<template>
  <v-container fluid class="container">
    <v-row>
      <v-col cols="12" class="d-flex flex-column align-start back">
        <v-row>
          <v-col v-if="vehicle !== null" class="d-flex flex-column ">
            <p class="display-4 font-weight-bold white--text ml-12 specParent">
              {{ vehicle.make }} {{ vehicle.model }}
            </p>
            <p class="display-1 ml-12 white--text">({{ vehicle.year }})</p>
          </v-col>
        </v-row>
        <v-container fluid>
          <v-row>
            <v-col
              cols="5"
              v-if="vehicle !== null"
              class="white--text d-flex justify-space-between mt-0 specParent"
            >
              <div class="d-flex ml-12 flex-column specs">
                <p class="mb-2">Top Speed</p>
                <p class="headline font-weight-light">
                  {{ vehicle.topSpeed }} mp/h
                </p>
              </div>
              <div class="d-flex flex-column specs">
                <p class="mb-2">60 mp/h</p>
                <p class="headline font-weight-light">
                  {{ vehicle.sixty }} mp/h
                </p>
              </div>
              <div class="d-flex flex-column specs">
                <p class="mb-2">Weight</p>
                <p class="headline font-weight-light">
                  {{ vehicle.weight }} lbs
                </p>
              </div>
              <div class="d-flex flex-column specs">
                <p class="mb-2">Engine</p>
                <p class="headline font-weight-light">{{ vehicle.engine }}</p>
              </div>
            </v-col>
            <v-col cols="5"></v-col>
            <v-col
              cols="1"
              @click="dialog = true"
              class="d-flex flex-column align-center align-self-end edit"
            >
              <v-icon x-large color="red">mdi-pencil</v-icon>
              <p class="white--text">Edit Vehicle</p>
            </v-col>
            <v-col
              cols="1"
              @click="deleteDialog = true"
              class="d-flex flex-column align-center align-self-end edit"
            >
              <v-icon x-large color="red">mdi-trash-can-outline</v-icon>
              <p class="white--text">Delete Vehicle</p>
            </v-col>
          </v-row>
        </v-container>
        <v-dialog v-model="deleteDialog" max-width="290">
          <v-card>
            <v-card-title class="headline"
              >Delete Vehicle?</v-card-title
            >

            <v-card-text>
              Are you sure you want delete {{ vehicle.make }}
              {{ vehicle.model }}
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="green darken-1" text @click="deleteDialog = false">
                NO
              </v-btn>

              <v-btn color="green darken-1" text @click="deleteVehicle">
                YES
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

    <v-row v-if="vehicle !== null">
      <v-col cols="4" class="mx-auto mt-12">
        <v-row>
          <v-col><p class="subtitle-1">PRICE</p></v-col>
          <v-spacer></v-spacer>
          <v-col class="d-flex justify-end"
            ><p class="headline">${{ vehicle.price }}</p></v-col
          >
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col><p class="subtitle-1">HORSE POWER</p></v-col>
          <v-spacer></v-spacer>
          <v-col class="d-flex justify-end"
            ><p class="headline">{{ vehicle.hp }} hp</p></v-col
          >
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col><p class="subtitle-1">0-60 MPH</p></v-col>
          <v-spacer></v-spacer>
          <v-col class="d-flex justify-end"
            ><p class="headline">{{ vehicle.sixty }} seconds</p></v-col
          >
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col><p class="subtitle-1">TOP SPEED</p></v-col>
          <v-spacer></v-spacer>
          <v-col class="d-flex justify-end"
            ><p class="headline">{{ vehicle.topSpeed }} mph</p></v-col
          >
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col><p class="subtitle-1">WEIGHT</p></v-col>
          <v-spacer></v-spacer>
          <v-col class="d-flex justify-end"
            ><p class="headline">{{ vehicle.weight }} ft/lbs</p></v-col
          >
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col><p class="subtitle-1">ENGINE</p></v-col>
          <v-spacer></v-spacer>
          <v-col class="d-flex justify-end"
            ><p class="headline">{{ vehicle.engine }}</p></v-col
          >
        </v-row>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" v-if="vehicle !== null" max-width="600">
      <v-card>
        <p class="display-1 text-center mx-auto pt-7">
          Editing {{ vehicle.make }} {{ vehicle.model }}
        </p>
        <v-container>
          <v-row>
            <v-col cols="10" class="mx-auto">
              <v-form v-model="valid">
                <v-row>
                  <v-col cols="6">
                    <v-select
                      v-model="vehicle.year"
                      dense
                      solo
                      :items="years"
                      label="year*"
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
                  <v-col cols="6">
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
              </v-form>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions class="d-flex justify-space-around align-start">
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="(dialog = false), updateVehicle(vehicle._id)"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    vehicle: null,
    dialog: false,
    deleteDialog: false,
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
  }),
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
    updateVehicle() {
      console.log(this.vehicle.price);
      axios({
        method: "post",
        url: `${process.env.VUE_APP_UPDATE}?&make=${this.vehicle.make}&model=${this.vehicle.model}&torque=${this.vehicle.torque}&engine=${this.vehicle.engine}&sixty=${this.vehicle.sixty}&topSpeed=${this.vehicle.topSpeed}&hp=${this.vehicle.hp}&weight=${this.vehicle.weight}&year=${this.vehicle.year}&id=${this.vehicle._id}&price=${this.vehicle.price}`,
      }).then(
        (response) => {
          console.log(response);
        },
        (err) => console.log(err)
      );
    },
    deleteVehicle() {
      console.log(process.env.VUE_APP_DELETE_VEHICLE)
      axios({
        method: "post",
        url: `${process.env.VUE_APP_DELETE_VEHICLE}${this.$route.params.id}`
      })
      this.deleteDialog = false
      this.$router.push('/RESTful')
    }
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
  },
  mounted() {
    axios
      .get(
        `${process.env.VUE_APP_ONE}${this.$route.params.id}`          
      )
      .then((response) => {
        console.log(response.data);
        this.vehicle = response.data;
      });
  },
};
</script>

<style>
.back {
  background: rgb(0, 0, 0);
  background: linear-gradient(
    140deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(34, 34, 34, 1) 52%,
    rgba(9, 9, 9, 0.9023984593837535) 100%
  );
  margin-top: -15px;
  height: 500px;
  width: 100vw;
}

.container {
  padding-top: 0px;
  margin-top: 0px;
}

.specParent {
  margin-top: 130px;
}

.specs {
  width: 300px;
}

.edit {
  cursor: pointer;
}
</style>
