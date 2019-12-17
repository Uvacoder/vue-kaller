<template>
  <div class="body">
    <v-overlay :value="overlay" opacity="0.9">
      <overlay
        :photos="photos"
        :overlay-prop="overlayProp"
        :window-size="windowSize"
        @close="test"
        @next="nextOverlay()"
        @prev="prevOverlay"
      ></overlay>
    </v-overlay>

    <v-container>
      <v-row no-gutters>
        <v-col
          v-for="(photo, index) in photos"
          :class="'col-lg-'+photo.col+' col-md-'+photo.col*2+' col-sm-12 phototest'"
          v-bind:key="photo.id"
        >
          <v-card class="px-2 pt-2" @click="showOverlay(index)">
            <v-img :src="$host + photo.path"></v-img>

            <v-card-subtitle class="pb-0">{{photo.lens}}</v-card-subtitle>

            <v-card-text class="text--primary">
              <div>{{photo.aperture}} and {{photo.shutterspeed}}s</div>
              <div>{{photo.date_string}}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import api from "../services/getPhotos.js";
import host from "../services/hostMixin.js";
import Overlay from "./PhotoOverlay";

export default {
  name: "style",
  data() {
    return {
      photos: [],
      height: 500,
      overlay: false,
      overlayProp: {
        path: "path",
        width: "",
        height: "",
        index: 0
      },
      windowSize: {
        x: 0,
        y: 0
      }
    };
  },
  methods: {
    async requestPhotos() {
      this.photos = await api.loadPhotos({ limit: "" });
    },
    showOverlay(index) {
      this.overlayProp.index = index;
      this.overlayProp.path = this.photos[index].path;
      this.overlayProp.height = this.photos[index].height;
      let width =
        this.photos[index].width /
        (this.photos[index].height / (this.windowSize.y * 0.9));
      if (width > this.windowSize.x * 0.9) {
        console.log("mode 1");
        this.overlayProp.height = "auto";
        this.overlayProp.width = this.windowSize.x * 0.9;
      } else {
        console.log("mode 1");
        this.overlayProp.width = width;
      }
      this.overlay = true;
      this.$router.push("/photography/" + this.photos[index].filename);
    },
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },
    test(value) {
      this.overlay = value;
      this.$router.push("/photography");
    },
    nextOverlay() {
      let index = this.overlayProp.index;
      this.showOverlay(index + 1);
      console.log("next");
    },
    prevOverlay() {
      let index = this.overlayProp.index;
      this.showOverlay(index - 1);
      console.log("prev");
    }
  },
  created() {
    this.requestPhotos();
  },
  mounted() {
    this.onResize();
  },
  components: {
    Overlay
  },
  mixins: [host]
};
</script>

<style scoped>
.phototest {
  padding: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.test {
  background-color: red;
}

.body {
  background-color: #383838;
}
</style>
