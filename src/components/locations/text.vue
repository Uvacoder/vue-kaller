<template>
  <v-card dark>
    <v-snackbar v-model="snackbar" top>
      Link copied to clipboard!
      <v-btn color="white" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>

    <p
      class="body-1 px-3 pt-3 ma-0"
      v-for="(paragraf,index) in location.paragrafs"
      v-bind:key="index"
    >{{paragraf}}</p>

    <div class="d-flex px-3 py-3 ma-0">
      <v-tooltip bottom v-if="$vuetify.breakpoint.xlOnly">
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            @click="openInMaps()"
            v-show="!$vuetify.breakpoint.smAndDown"
            height="36px"
            class="mr-2 pa-0"
            color="success"
          >
            <v-icon class="pa-0">mdi-google-maps</v-icon>
          </v-btn>
        </template>
        <span>Open {{location.name}} in google maps</span>
      </v-tooltip>
      <v-tooltip right v-if="$vuetify.breakpoint.xlOnly">
        <template v-slot:activator="{ on }">
          <navigator-share
            v-bind:on-error="onError"
            :url="'https://kallers.se/photography/'"
            title="Kaller Creations"
            text
          >
            <v-btn color="primary" v-on="on">
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
export default {
  name: "locationText",
  props: {
    location: Object
  },
  data() {
    return {
      snackbar: false
    };
  },
  methods: {
    openInMaps() {
      window.open(
        "https://www.google.com/maps/search/?api=1&query=" + this.location.name,
        "_blank"
      );
    },
    onError() {
      console.log("error");
      this.doCopy("https://kallers.se/photography/" + this.$route.params.photo);
      this.snackbar = true;
    },
    doCopy: function(text) {
      this.$copyText(text);
    }
  },
  components: {
    NavigatorShare
  }
};
</script>

<style>
</style>