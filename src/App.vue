<template>
  <v-app>
    <v-toolbar dark>
      <v-toolbar-title>Kaller Creations</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn to="/" text>Portfolio</v-btn>
        <v-btn to="/photography" text>Photography</v-btn>
        <v-btn to="/locations" text>Locations</v-btn>
        <v-btn to="/contact" text>Contact</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <router-view/>
  </v-app>
</template>

<script>


export default {
  name: 'App',


  data: () => ({
    //
  }),
};
</script>
