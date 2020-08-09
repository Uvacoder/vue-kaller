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

    <div @click="prevOverlay()">
      <v-btn fab large outlined v-if="!overlayProp.fullscreen" class="ma-2">
        <v-icon style="font-size: 60px;">mdi-chevron-left</v-icon>
      </v-btn>
    </div>
    <div class="d-inline" :style="'width: '+this.overlayProp.width+'px'">
      <div class="box">
        <v-img
          :lazy-src="$host + overlayProp.photo.pre_path"
          :src="$host + overlayProp.photo.high_path"
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
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <navigator-share
                v-bind:on-error="onError"
                :url="'https://kallers.se/photography/' + overlayProp.photo.filename"
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

          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <a
                :download="overlayProp.photo.filename"
                :href="'https://kallers.se/images/2k/' + overlayProp.photo.filename"
              >
                <v-btn color="primary" class="ml-2" v-on="on">
                  <v-icon size="20">mdi-download</v-icon>
                </v-btn>
              </a>
            </template>
            <span>Download photo</span>
          </v-tooltip>
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                class="ml-2"
                @click="wideOverlay()"
                v-if="!$vuetify.breakpoint.smAndDown"
                v-on="on"
              >
                <v-icon size="20">{{fullscreenIcon}}</v-icon>
              </v-btn>
            </template>
            <span>Toggle fullscreen</span>
          </v-tooltip>
        </div>
      </div>
    </div>
    <div>
      <v-btn fab large outlined @click="nextOverlay()" v-if="!overlayProp.fullscreen" class="ma-2">
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
      snackbar: false,
      fullscreenIcon: "mdi-fullscreen"
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
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    },
    wideOverlay() {
      if (this.fullscreenIcon !== "mdi-fullscreen") {
        this.fullscreenIcon = "mdi-fullscreen";
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        this.$emit("fullscreen", false);
      } else {
        this.fullscreenIcon = "mdi-fullscreen-exit";
        document.documentElement.requestFullscreen();
        this.$emit("fullscreen", true);
      }
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
    if (!this.$vuetify.breakpoint.smAndDown)
      this.overlayProp.fullscreen = false;
  },
  computed: {
    url() {
      return window.location.href;
    }
  },
  beforeDestroy() {
    this.$emit("fullscreen", false, true);
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