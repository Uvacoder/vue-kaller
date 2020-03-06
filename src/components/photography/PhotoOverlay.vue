<template>
  <div
    class="overlayPhoto d-flex"
    v-touch="{
      left: () => nextOverlay(),
      right: () => prevOverlay(),
      up: () => hideOverlay(),
      down: () => hideOverlay()
    }"
    @click.self="hideOverlay()"
  >
    <v-snackbar v-model="snackbar" top>
      Link copied to clipboard!
      <v-btn color="white" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>

    <div @click="prevOverlay()" class="pa-2" v-if="!$vuetify.breakpoint.smAndDown">
      <v-btn fab large outlined>
        <v-icon style="font-size: 60px;">mdi-chevron-left</v-icon>
      </v-btn>
    </div>
    <div class="d-inline" :style="'width: '+this.overlayProp.width+'px'">
      <div class="box">
        <v-img
          :aspect-ratio="overlayProp.width/overlayProp.height"
          :lazy-src="$host + overlayProp.photo.prepath"
          :src="$host + overlayProp.photo.highpath"
          :height="overlayProp.height"
          :width="overlayProp.width"
          :key="overlayProp.photo.id"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </div>
      <div class="d-flex justify-space-around align-center media pa-2">
        <h3>{{new Date(overlayProp.photo.date*1000).toLocaleDateString()}}</h3>
        <div class="d-flex justify-center align-center">
          <navigator-share
            v-bind:on-error="onError"
            :url="'https://kallers.se/photography/' + overlayProp.photo.filename"
            title="Kaller Creations"
            text
          >
            <v-btn color="primary">
              <v-icon size="20">mdi-share-variant</v-icon>
            </v-btn>
          </navigator-share>
          <a
            :download="overlayProp.photo.filename"
            :href="'https://kallers.se/images/2k/' + overlayProp.photo.filename"
          >
            <v-btn color="primary" class="ml-2">
              <v-icon size="20">mdi-download</v-icon>
            </v-btn>
          </a>
        </div>
      </div>
    </div>
    <div v-if="!$vuetify.breakpoint.smAndDown" class="button d-flex justify-end pa-2">
      <v-btn fab large outlined @click="nextOverlay()">
        <v-icon style="font-size: 60px;">mdi-chevron-right</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import NavigatorShare from "vue-navigator-share";

export default {
  name: "PhotoOverlay.vue",
  props: {
    windowSize: Object,
    overlayProp: Object
  },
  data() {
    return {
      snackbar: false
    };
  },
  methods: {
    nextOverlay() {
      console.log("next");
      this.$emit("next");
    },
    prevOverlay() {
      console.log("prev");
      this.$emit("prev");
    },
    hideOverlay() {
      this.$emit("close", false);
    },
    onError() {
      this.doCopy("https://kallers.se/photography/" + this.$route.params.photo);
      this.snackbar = true;
    },
    doCopy: function(text) {
      this.$copyText(text);
    }
  },
  components: {
    NavigatorShare
  },
  created() {
    window.addEventListener("keydown", e => {
      switch (e.key) {
        case "Escape":
          this.hideOverlay();
          break;
        case "ArrowLeft":
          this.prevOverlay();
          break;
        case "ArrowRight":
          this.nextOverlay();
          break;
      }
    });
  },
  computed: {
    url() {
      return window.location.href;
    }
  }
};
</script>

<style scoped>
.overlayPhoto {
  height: 100vh;
  width: 100vw;
  justify-content: space-between;
  align-items: center;
}

.overlayPhoto .box {
  background-color: white;
  padding: 4px;
  touch-action: pinch-zoom;
}
</style>