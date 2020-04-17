<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped disable-resize-watcher temporary>
      <v-list dense>
        <v-list-item :to="item.to" v-for="item in items" :key="item.text" link>
          <v-list-item-action>
            <v-icon :color="item.color">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-subheader class="mt-4 grey--text text--darken-1"
          >FILTERS</v-subheader
        >
        <v-spacer/>
        <v-list-item>
          <v-switch v-model="$vuetify.theme.dark" primary color="red" label="Dark Mode"/>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="red" dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-icon class="mx-4">mdi-car-traction-control</v-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title font-weight-light">DRIFTY</span>
      </v-toolbar-title>
      <v-spacer />
      <v-row style="max-width: 150px" class="d-flex">
        <v-btn dark text to="/cart">
          <v-badge
          :content="this.$store.state.cartItems"
          :value="this.$store.state.showCartItems"
          color="green"
          class="mx-4"
          overlap
        >
          <v-icon to="/cart">mdi-cart-outline</v-icon>
        </v-badge>cart
        <!-- <v-icon dark right>mdi-cart-outline</v-icon> -->
      </v-btn>
        
      </v-row>
    </v-app-bar>

    <v-content>
      <v-container fluid class="fill-height ma-0 pa-0">
        <v-row class="ma-0 pa-0">
          <v-col class="ma-0 pa-0">
            <router-view class="ma-0 pa-0"></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  methods: {
    
  },
  data: () => ({
    drawer: null,
    mode: true,
    items: [
      {
        icon: "mdi-car-multiple",
        text: "ALL VEHICLES",
        color: "blue",
        to: '/'
      },
      { icon: "mdi-car-side", text: "CARS", color: "green", to: "/cars" },
      { icon: "mdi-car-estate", text: "SUVS", color: "orange", to: "/suvs" },
      { icon: "mdi-car-pickup", text: "TRUCKS", color: "red", to: "/trucks" },
      { icon: "mdi-car-pickup", text: "RESTful API", color: "blue", to: "/RESTful" },
      { icon: "mdi-plus-circle-outline", text: "ADD VEHICLE", color: "red", to: "/add-vehicle" },
    ],
  }),
  created() {
  }
};
</script>
