<template>
  <v-content>
    
    <v-row>
      <v-col
        class="d-flex flex-row"
        xl="3"
        lg="3"
        md="4"
        sm="6"
        xs="12"
        v-for="(car, i) in cars"
        :key="car.model"
      >
        <v-card width="8000" class="mt-4 mx-4 elevation-8">
          <v-img :src="car.images[0].image"></v-img>
          <!-- <v-carousel
                    hide-delimiter-background
                    hide-arrow-background
                    v-model="model"
                    height="130px"
                    delimiter-icon="mdi-minus"
                  >
                    <v-carousel-item 
                      v-for="image in car.images" 
                      :key="image.id"
                      :src="image.image">
                      
                    </v-carousel-item>
                  </v-carousel> -->
          <v-card-title class="title font-weight-regular">
            {{ car.year }} {{ car.make }} {{ car.model }}
          </v-card-title>
          <v-card-text class="title font-weight-regular">${{ car.price }}</v-card-text>
          <v-divider />
          <v-row class="ml-auto" background-color="red">
            <v-col>
              <h3>Power:</h3>
              <h3>Torque:</h3>
              <h3>Engine:</h3>
              <h3>0-60:</h3>
              <h3>Top Speed:</h3>
              <h3>Weight:</h3>
            </v-col>
            <v-col>
              <h3>{{ car.power }} hp</h3>
              <h3>{{ car.torque }} foot lbs</h3>
              <h3>{{ car.engine }}</h3>
              <h3>{{ car.sixty }} seconds</h3>
              <h3>{{ car.top_speed }} mph</h3>
              <h3>{{ car.weight }} lbs</h3>
            </v-col>
          </v-row>
            <v-row>
              <v-col class="d-flex justify-space-around justify-center">
                <v-btn
                  dark
                  small
                  color="red lighten-1"
                  outlined
                  @click="updateCart(car)"
                >
                  <v-icon left>mdi-cart-outline</v-icon> Add to cart
                </v-btn>
                <v-btn
                  small
                  dark
                  color="green"
                  outlined
                  @click="dialog = true"
                >
                  <v-icon left>mdi-format-list-bulleted</v-icon> View
                </v-btn>
              </v-col>
            </v-row>
          <v-row justify="center">
            <v-dialog 
              v-model="dialog" 
              width="600px"
              :key="i">
              <template> </template>
              <v-card>
                <v-card-title>
                  <span class="headline"
                    >{{ car.year }} {{ car.make }} {{ car.model }}
                    <span class="title font-weight-light"
                      >({{ car.vehicleType }})</span
                    ></span
                  >
                </v-card-title>
                <!-- Carousel start -->
                <div>
                  <v-carousel
                    hide-delimiter-background
                    hide-arrow-background
                    v-model="model"
                    height="300px"
                    delimiter-icon="mdi-minus"
                  >
                    <v-carousel-item 
                      v-for="image in car.images" 
                      :key="image.id"
                      :src="image.image">
                      
                    </v-carousel-item>
                  </v-carousel>
                </div>
                <!-- Carousel end -->
                <v-card-text>
                  <p class="text-center title mt-4">Details for this vehicle</p>
                  <v-row>
                    <v-col>
                      <h3>Power:</h3>
                      <h3>Torque:</h3>
                      <h3>Engine:</h3>
                      <h3>0-60:</h3>
                      <h3>Top Speed:</h3>
                      <h3>Weight:</h3>
                    </v-col>
                    <v-col>
                      <h3>{{ car.power }} hp</h3>
                      <h3>{{ car.torque }} foot lbs</h3>
                      <h3>{{ car.engine }}</h3>
                      <h3>{{ car.sixty }} seconds</h3>
                      <h3>{{ car.top_speed }} mph</h3>
                      <h3>{{ car.weight }} lbs</h3>
                    </v-col>
                    <v-divider vertical />
                    <v-col>
                      <h3>Mileage:</h3>
                      <h3>Condition:</h3>
                      <h3>Title:</h3>
                      <h3>VIN:</h3>
                      <h3>Transmission:</h3>
                      <h3>Drive Type:</h3>
                    </v-col>
                    <v-col>
                      <h3>{{ car.mileage }} miles</h3>
                      <h3>{{ car.condition }}</h3>
                      <h3>{{ car.title }}</h3>
                      <h3>{{ car.vin }}</h3>
                      <h3>{{ car.transmission }}</h3>
                      <h3>{{ car.driveType }}</h3>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    class=""
                    dark
                    color="red lighten-1"
                    outlined
                    @click="updateCart"
                  >
                    <v-icon left>mdi-cart-outline</v-icon> Add to cart
                  </v-btn>
                  <v-btn color="green darken-1" text @click="dialog = false"
                    >close</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      New Content
      <AddVehicle />
      <VehicleCard />
    </v-row>
  </v-content>
</template>

<script>
import AddVehicle from './AddVehicle'
import VehicleCard from './VehiclesCard'
export default {
  components: {
    AddVehicle,
    VehicleCard
  },
  data: () => ({
    dialog: false,
    model: 0,
    colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
    cars: [
      {
        make: "Koenigsegg",
        model: "Agera RS",
        year: "2018",
        top_speed: "278",
        image: 'https://i.imgur.com/Xbf6slT.jpg',
        power: "1,160",
        weight: "3,075",
        images: [
          { image: 'https://i.imgur.com/Xbf6slT.jpg', id: '1' },
          { image: "https://i.imgur.com/Xbf6slT.jpg", id: '2' },
          { image: "https://i.imgur.com/Xbf6slT.jpg", id: '3' }
        ],
        engine: "V8",
        torque: "944",
        sixty: "2.9",
        price: "2,500,000",
        mileage: "20,000",
        condition: "New",
        title: "Clean",
        vin: "135135153483153A",
        transmission: "Manual",
        driveType: "AWD",
        vehicleType: "Super Car"
      },
      {
        make: "McLaren",
        model: "P1",
        year: "2015",
        top_speed: "217",
        power: "903",
        image: "https://i.imgur.com/BgNCGDU.jpg",
        weight: "3,411",
        images: [
          { image: "https://i.imgur.com/BgNCGDU.jpg", id: '4' },
          { image: "https://i.imgur.com/BgNCGDU.jpg", id: '5' },
          { image: "https://i.imgur.com/BgNCGDU.jpg", id: '6' }
        ],
        engine: "V8",
        torque: "664",
        sixty: "2.7",
        price: "1,150,000",
        mileage: "20,000",
        condition: "New",
        title: "Clean",
        vin: "135135153483153A",
        transmission: "Manual",
        driveType: "AWD",
        vehicleType: "Super Car"
      },
      {
        make: "McLaren",
        model: "720S",
        year: "2020",
        top_speed: "",
        power: "720",
        image: "https://i.imgur.com/WT7b89f.jpg",
        weight: "2,937",
        images: [
          { image: "https://i.imgur.com/WT7b89f.jpg", id: '7' },
          { image: "https://i.imgur.com/WT7b89f.jpg", id: '8' },
          { image: "https://i.imgur.com/WT7b89f.jpg", id: '9' }
        ],
        engine: "V8",
        torque: "664",
        sixty: "2.8",
        price: "284,745",
        mileage: "20,000",
        condition: "New",
        title: "Clean",
        vin: "135135153483153A",
        transmission: "Manual",
        driveType: "AWD",
        vehicleType: "Super Car"
      },
      {
        make: "Lamborghini",
        model: "Aventador",
        year: "2019",
        top_speed: "217",
        power: "690",
        image: "https://i.imgur.com/rbZQzvq.jpg",
        weight: "3,472",
        images: [
          { image: "https://i.imgur.com/rbZQzvq.jpg", id: '10' },
          { image: "https://i.imgur.com/rbZQzvq.jpg", id: '11' },
          { image: "https://i.imgur.com/rbZQzvq.jpg", id: '12' }
        ],
        engine: "V12",
        torque: "507",
        sixty: "2.9",
        price: "417,826",
        mileage: "20,000",
        condition: "New",
        title: "Clean",
        vin: "135135153483153A",
        transmission: "Manual",
        driveType: "AWD",
        vehicleType: "Super Car"
      },
      {
        make: "Lamborghini",
        model: "Huracán",
        year: "2020",
        top_speed: "199",
        power: "630",
        image: "https://i.imgur.com/s8P2tL0.jpg",
        weight: "3,424",
        images: [
          { image: "https://i.imgur.com/s8P2tL0.jpg", id: '13' },
          { image: "https://i.imgur.com/s8P2tL0.jpg", id: '14' },
          { image: "https://i.imgur.com/s8P2tL0.jpg", id: '15' }
        ],
        engine: "V10",
        torque: "442",
        sixty: "2.5",
        price: "261,274",
        mileage: "20,000",
        condition: "New",
        title: "Clean",
        vin: "135135153483153A",
        transmission: "Manual",
        driveType: "AWD",
        vehicleType: "Super Car"
      }
    ]
  }),
  methods: {
    updateCart(vehicle) {
      console.log(vehicle)
      this.$store.state.cartItems++;
      this.$store.state.showCartItems = true;
      this.$store.state.vehicles.push(vehicle)
      console.log(this.$store.state.vehicles)
    }
  }
};
</script>

<style>
h3 {
  font-weight: 400;
}
</style>
