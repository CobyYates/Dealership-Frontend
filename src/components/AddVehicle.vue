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
      price
    }"
    @done="onDone"
  >
    <template v-slot="{ mutate, loading, error }">
      <!-- Form here -->
      <v-form>
        <v-container>
          <v-btn large primary :disabled="loading" @click="mutate()"
            >Add Vehicle</v-btn
          >
          <p v-if="error">An error occured: {{ error }}</p>
        </v-container>
      </v-form>
    </template>
  </ApolloMutation>
</template>

<script>
export default {
  data: function() {
    return {
      make: "Ford",
      model: "Raptor",
      year: 2020,
      topSpeed: 150,
      power: 800,
      weight: 5000,
      engine: "V6",
      torque: 850,
      sixty: 8.3,
      price: 85000
    };
  },
  methods: {
    onDone() {
      return console.log("Done");
    }
  }
};
</script>
