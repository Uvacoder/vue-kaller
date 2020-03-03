<template>
  <v-app>
    <v-app-bar dark fixed class="hidden-sm-and-down">
      <v-toolbar-title>Kaller Creations</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn to="/" text>Portfolio</v-btn>
        <v-btn to="/photography" text>Photography</v-btn>
        <v-btn to="/locations" text>Locations</v-btn>
        <v-btn to="/contact" text>Contact</v-btn>
        <v-btn to="/admin" text>Dashboard</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-app-bar dark fixed :hide-on-scroll="false" class="hidden-md-and-up">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title class="pr-2">Kaller Creations</v-toolbar-title>
      <navigator-share v-bind:on-error="onError" :url="url" title="Kaller Creations" text>
        <v-icon>mdi-share-variant</v-icon>
      </navigator-share>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary dark class="navDrawer">
      <v-list nav dense>
        <v-list-item-group>
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
    <keep-alive>
      <router-view />
    </keep-alive>
  </v-app>
</template>

<script>
import NavigatorShare from "vue-navigator-share";

export default {
  name: "App",

  data: () => ({
    drawer: false
  }),
  components: {
    NavigatorShare
  },
  computed: {
    url() {
      return window.location.href;
    },
    title() {
      return document.title;
    }
  }
};
</script>

<style>
.navspacer {
  height: 64px;
  background-color: #383838;
}

.navDrawer {
  position: fixed !important;
}

.v-list-item-title {
  color: red !important;
}

body::-webkit-scrollbar {
  width: 3px;
}

body::-webkit-scrollbar * {
  background: transparent;
}

body::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.8) !important;
}

body {
  background-color: #383838;
}
</style>
