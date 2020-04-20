import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartItems: 0,
    showCartItems: false,
    darkMode: true,
    editedVehicle: null,
    vehicles: [],
    makes: [
      "Acura",
      "Alfa Romeo",
      "Aston Martin",
      "Audi",
      "Bentley",
      "BMW",
      "Bugatti",
      "Cadillac",
      "Chevrolet",
      "Dodge",
      "Ferrari",
      "Fiat",
      "Ford",
      "General Motors",
      "Honda",
      "Hyundai",
      "Infiniti",
      "Jaguar",
      "Jeep",
      "Kia",
      "Koenigsegg",
      "Lamborghini",
      "Land Rover",
      "Lexus",
      "Maserati",
      "Mazda",
      "McLaren",
      "Mercedes-Benz",
      "Mini",
      "Pagani",
      "Porsche",
      "Rolls Royce",
      "Subaru",
      "Tesla",
      "Toyota",
      "Volkswagon",
      "Volvo",
    ],
  },
  mutations: {
    editVehicle(state, vehicle) {
      state.editedVehicle = vehicle
    },
  },
  actions: {
    editVehicle(context, vehicle) {
      context.commit('editVehicle', vehicle)
    }
  }
});