<template>
  <v-card dark class="mb-6">
    <v-row class="px-6 py-3 align-center">
      <div v-if="$vuetify.breakpoint.xlOnly">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              light
              @click="$router.push('/locations/')"
              height="48px"
              class="mr-2 pa-0"
              v-on="on"
            >
              <v-icon class="pa-0">mdi-arrow-left</v-icon>
            </v-btn>
          </template>
          <span>Go back to locations</span>
        </v-tooltip>
      </div>
      <p class="white--text display-3 ma-0">{{location.name}}</p>

      <v-spacer></v-spacer>
      <v-rating
        v-model="location.rating"
        color="red"
        half-increments
        background-color="grey"
        empty-icon="mdi-heart-outline"
        half-icon="mdi-heart-half-full"
        full-icon="mdi-heart"
        class="mx-3"
      ></v-rating>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "locationHeader",
  props: {
    location: Object
  }
};
</script>

<style>
</style>