<template>
  <v-card dark>
    <v-snackbar v-model="snackbar" top>
      Link copied to clipboard!
      <v-btn color="white" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <p class="title px-3 pt-3 ma-0">{{location.coords}}</p>
    <p class="body-1 px-3 pt-3 ma-0" v-bind:key="index">{{location.description}}</p>

    <div class="d-flex px-3 py-3 ma-0">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            :href="'https://www.google.com/maps/search/?api=1&query=' + location.name"
            v-show="!$vuetify.breakpoint.smAndDown"
            height="36px"
            v-if="$vuetify.breakpoint.xlOnly"
            class="mr-2 pa-1"
            color="success"
            target="_blank"
          >
            Open in maps
            <v-icon class="pa-0">mdi-google-maps</v-icon>
          </v-btn>
        </template>
        <span>Open {{location.name}} in google maps</span>
      </v-tooltip>
      <v-tooltip bottom v-if="location.googlealbum">
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            height="36px"
            class="mr-2 pa-1"
            color="warning"
            :href="location.googlealbum"
            target="_blank"
          >
            Show album
            <v-icon class="pa-0">mdi-google-photos</v-icon>
          </v-btn>
        </template>
        <span>Open album of trip to {{location.name}} in google photos</span>
      </v-tooltip>

      <v-tooltip right>
        <template v-slot:activator="{ on }">
          <navigator-share
            v-bind:on-error="onError"
            :url="'https://kallers.se/locations/' + $route.params.location.unSwedify()"
            title="Kaller Creations"
            text
          >
            <v-btn color="primary" v-on="on">
              Share
              <v-icon size="20">mdi-share-variant</v-icon>
            </v-btn>
          </navigator-share>
        </template>
        <span>Copy link to clipboard</span>
      </v-tooltip>
    </div>

    <div v-for="(history,index) in location.history" v-bind:key="'key'+index">
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-action>
          <v-icon>mdi-camera</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{history}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-card>
</template>

<script>
import NavigatorShare from "vue-navigator-share";
import "../../services/unswedifyString";

export default {
  name: "locationText",
  props: {
    location: Object,
  },
  data() {
    return {
      snackbar: false,
    };
  },
  methods: {
    onError() {
      console.log(this.$route.params.location.unSwedify());
      this.doCopy(
        "https://kallers.se/locations/" +
          this.$route.params.location.unSwedify()
      );
      this.snackbar = true;
    },
    doCopy: function (text) {
      this.$copyText(text);
    },
  },
  components: {
    NavigatorShare,
  },
};
</script>

<style>
</style>