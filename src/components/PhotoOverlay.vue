<template>
  <div
    class="overlayPhoto"
    @keyup.right="nextOverlay()"
    @keyup.left="prevOverlay()"
    v-touch="{
      left: () => nextOverlay(),
      right: () => prevOverlay(),
      up: () => hideOverlay(),
      down: () => hideOverlay()
    }"
  >
    <div
      @click="prevOverlay()"
      class="button d-flex justify-start"
      v-if="!$vuetify.breakpoint.smAndDown"
    >
      <v-btn fab large color="secondary">
        <v-icon style="font-size: 70px;">mdi-chevron-left</v-icon>
      </v-btn>
    </div>
    <div @click="hideOverlay()" class="exit" v-if="!$vuetify.breakpoint.smAndDown"></div>
    <div class="d-inline" :style="'width: '+this.overlayProp.width+'px'">
      <div @click="hideOverlay()" class="exit" v-if="!$vuetify.breakpoint.smAndDown"></div>
      <div class="box">
        <v-img
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
          <a download="file" :href="'https://kallers.se/images/2k/' + overlayProp.photo.filename">
            <v-btn color="primary" class="ml-2">
              <v-icon size="20">mdi-download</v-icon>
            </v-btn>
          </a>
        </div>
      </div>
      <div @click="hideOverlay()" class="exit" v-if="!$vuetify.breakpoint.smAndDown"></div>
    </div>
    <div @click="hideOverlay()" class="exit" v-if="!$vuetify.breakpoint.smAndDown"></div>
    <div
      v-if="!$vuetify.breakpoint.smAndDown"
      @click="nextOverlay()"
      class="button d-flex justify-end"
    >
      <v-btn fab large color="secondary">
        <v-icon style="font-size: 70px;">mdi-chevron-right</v-icon>
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
    doCopy(text) {
      this.$copyText(text).then(
        function(e) {
          alert("Copied");
          console.log(e);
        },
        function(e) {
          alert("Can not copy");
          console.log(e);
        }
      );
    },
    onError() {
      alert(
        "Please open this website in another browser, Chrome or Safari is recommended. This feature only works on mobile"
      );
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
  height: 95vh;
  width: 99vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.overlayPhoto .button {
  flex-grow: 1;
  height: 600px;
  align-items: center;
}

.overlayPhoto .box {
  background-color: white;
  padding: 4px;
  touch-action: pinch-zoom;
}

.exit {
  flex-grow: 3;
  height: 100vh;
}

.media {
}
</style>