<template>
  <v-app>
    <v-app-bar dark fixed class="hidden-md-and-down">
      <v-toolbar-title>Kaller Creations</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn to="/" text>Portfolio</v-btn>
        <v-btn to="/photography" text>Photography</v-btn>
        <v-btn to="/locations" text>Locations</v-btn>
        <v-btn to="/contact" text>Contact</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-app-bar dark fixed hide-on-scroll class="hidden-lg-and-up">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title>Kaller Creations</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
            v-model="drawer"
            absolute
            temporary
            dark
    >
      <v-list
              nav
              dense
      >
        <v-list-item-group>
          <v-list-item>
            <v-toolbar-title>Kaller Creations</v-toolbar-title>
          </v-list-item>

          <v-list-item to="/">
            <v-list-item-title>Portfolio</v-list-item-title>
          </v-list-item>

          <v-list-item to="/photography">
            <v-list-item-title>Photography</v-list-item-title>
          </v-list-item>

          <v-list-item to="/locations">
            <v-list-item-title>Locations</v-list-item-title>
          </v-list-item>

          <v-list-item to="/contact">
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <div class="navspacer"></div>
    <router-view/>
  </v-app>
</template>

<script>


export default {
  name: 'App',


  data: () => ({
    drawer: false
  }),
};
</script>

<style>
  .navspacer{
    height: 64px;
    background-color: #383838;
  }
</style>
