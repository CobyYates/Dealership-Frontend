<template>
  <v-content>
    <v-row>
      <v-col cols="8" class="ml-auto mr-auto">
        <h1 class="text-center py-6 font-weight-light">Shopping Cart</h1>
        <v-container v-if="this.$store.state.vehicles.length === 0">
            <h2>
                You have not added vehicles to your cart.
            </h2>
            <v-btn to="/" color="success" class="mt-10">View Vehicles</v-btn>
        </v-container>
        
        <v-data-table
          v-if="this.$store.state.vehicles.length > 0"
          :headers="headers"
          :items="this.$store.state.vehicles"
          :sort-by="['make']"
          :sort-desc="[true, false]"
          class="elevation-6 mx-12 my-6"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Your Vehicles</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>

          <template v-slot:item.image="{ item }">
            <v-avatar size="100px" tile>
              <v-img :src="item.image" height="60px"></v-img>
            </v-avatar>
          </template>

          <template v-slot:item.action="{ item }">
            <v-icon x-large class="title" @click="deleteItem(item)" color="red">
              mdi-trash-can-outline
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: "Image", value: "image", sortable: false },
      { text: "Make", value: "make", sortable: true },
      { text: "Model", value: "model", sortable: false },
      { text: "Year", value: "year", sortable: false },
      { text: "Price", value: "price", sortable: false },
      { text: "Actions", value: "action", sortable: false }
    ]
  }),
  computed: {},
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
//   created() {
//     this.initialize();
//   },
  methods: {
    getColor(approve) {
      return approve ? "green" : "red";
    },
    getApproved(approval) {
      if (approval === true) return "Accepted";
      else return "Pending";
    },
    initialize() {
      //inital data values for table
    },
    editItem(item) {
      this.editedIndex = this.clients.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.$store.state.vehicles.indexOf(item);
      confirm("Are you sure you want to delete this vehicle?") &&
        this.$store.state.vehicles.splice(index, 1);
      this.$store.state.cartItems--;
      if (this.$store.state.cartItems < 1 ) {
          this.$store.state.showCartItems = false;
      }
    },
    close() {
      this.dialog = false;

      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    }
  },
};
</script>

<style>
</style>
