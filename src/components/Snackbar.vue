<template>
  <div class="text-center ma-2">
    <v-snackbar
      v-model="snackbar"
    >
      {{ message }}
      <v-btn
        color="success"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
    props: ['snackbar', 'message'],
    data: () => ({
    })
}
</script>

<style>

</style>