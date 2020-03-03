<template>
  <div class="body">
    <v-overlay :value="overlay" opacity="0.9">
      <overlay
        :overlay-prop="overlayProp"
        :window-size="windowSize"
        @close="closeOverlay"
        @next="nextOverlay"
        @prev="prevOverlay"
      ></overlay>
    </v-overlay>
    <v-container>
      <v-row align="center" justify="center"></v-row>
      <v-row justify="space-between">
        <v-col class="pa-0 ma-0 pl-5 d-flex justify-start">
          <v-btn @click="flipPhotos()" height="48px" class="mr-2 pa-0">
            <v-icon class="pa-0">{{order.icon}}</v-icon>
          </v-btn>
          <!--                    <v-btn large height="48px">-->
          <!--                        <v-icon class="pa-0">mdi-filter-menu</v-icon>-->
          <!--                    </v-btn>-->
        </v-col>
        <v-col class="pa-0 ma-0 pr-5 d-flex justify-end">
          <v-btn-toggle v-model="mode">
            <v-btn v-for="size in columns.allowedSizes" @click="splitPhotosV2(size)">
              <v-icon>{{columns.icons[size]}}</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
      <v-fade-transition>
        <v-row no-gutters v-show="show" class="pt-0 mt-0">
          <v-col
            v-for="array in splitPhotos"
            :class="'col-'+columns.size +' d-flex flex-column'+order.reverse+' justify-'+order.justify"
          >
            <div v-for="photo in array" class="d-flex pa-2" v-bind:key="photo.id">
              <photoCard :photo="photo" :click="showOverlay" :text="text"></photoCard>
            </div>
          </v-col>
        </v-row>
      </v-fade-transition>
    </v-container>
  </div>
</template>

<script>
import Overlay from "./PhotoOverlay";
import photoCard from "./photoCard";
import { mapState } from "vuex";

export default {
  name: "style",
  data() {
    return {
      show: false,
      overlay: false,
      overlayProp: {
        path: "path",
        width: "",
        height: "",
        index: 0
      },
      splitPhotos: {},
      switch1: true,
      order: {
        reverse: "",
        justify: "start",
        icon: "mdi-sort-descending"
      },
      columns: {
        amount: 3,
        size: 4,
        allowedSizes: [],
        mode: "test",
        icons: [
          "none",
          "mdi-numeric-1-box-multiple-outline",
          "mdi-numeric-2-box-multiple-outline",
          "mdi-numeric-3-box-multiple-outline",
          "mdi-numeric-4-box-multiple-outline",
          "none",
          "mdi-numeric-6-box-multiple-outline",
          "none",
          "none",
          "none",
          "none",
          "none",
          "mdi-numeric-9-plus-box-multiple-outline"
        ]
      },
      text: true
    };
  },
  computed: {
    ...mapState(["photos", "windowSize"])
  },
  methods: {
    showOverlay(photo, active = true, router = true) {
      if (active) {
        let index = this.photos.indexOf(photo);
        this.overlayProp.photo = photo;
        this.overlayProp.index = index;
        this.overlayProp.path = photo.path;
        this.overlayProp.height = photo.height;
        let width = photo.width / (photo.height / (this.windowSize.y * 0.9));
        if (width > this.windowSize.x * 0.9) {
          this.overlayProp.height = "auto";
          if (this.windowSize.x < 960)
            this.overlayProp.width = this.windowSize.x * 0.95;
          else this.overlayProp.width = this.windowSize.x * 0.8;
        } else {
          this.overlayProp.width = width;
          this.overlayProp.height = this.windowSize.y * 0.9;
        }
        this.overlay = true;
        if (router) this.$router.push("/photography/" + photo.filename);
      }
    },
    onResize() {
      if (this.overlay) this.showOverlay(this.overlayProp.photo);
      this.$store.dispatch("getWindowSize");

      this.showOverlay(this.overlayProp.photo, this.overlay);

      if (this.windowSize.x > 1904) {
        this.columns.allowedSizes = [4, 6, 12];
      } else if (this.windowSize.x > 1264) {
        this.columns.allowedSizes = [3, 4, 6];
      } else if (this.windowSize.x > 960) {
        this.columns.allowedSizes = [2, 3, 4];
        this.text = true;
      } else {
        this.columns.allowedSizes = [1, 2];
      }

      if (this.columns.amount > this.columns.allowedSizes.slice(-1)[0])
        this.splitPhotosV2(this.columns.allowedSizes.slice(-1)[0]);
      if (this.columns.amount < this.columns.allowedSizes[0])
        this.splitPhotosV2(this.columns.allowedSizes[0]);
      if (Math.max(...this.columns.allowedSizes) === this.columns.amount) {
        this.text = false;
      } else this.text = true;
    },
    closeOverlay(value) {
      this.overlay = value;
      this.$router.push("/photography");
    },
    nextOverlay() {
      let index = this.overlayProp.index;
      this.showOverlay(this.photos[index + 1]);
    },
    prevOverlay() {
      let index = this.overlayProp.index;
      this.showOverlay(this.photos[index - 1]);
    },
    photoSelected() {
      const photos = this.photos;
      console.log("ROUTE FOUND", this.$route.params.photo);
      if (this.$route.params.photo) {
        photos.forEach(photo => {
          if (photo.filename === this.$route.params.photo) {
            this.showOverlay(photo, true, false);
          }
        });
      }
    },
    splitPhotosV2(cols) {
      console.log("I AM RUNNING", cols);

      this.columns.amount = cols;
      this.columns.size = 12 / cols;

      const photos = this.photos;
      let splitPhotos = [];
      let heights = [];

      for (let i = 0; i < cols; i++) {
        splitPhotos[i] = [photos[i]];
        heights[i] = photos[i].height / photos[i].width;
      }

      this.photos.forEach(async (photo, index) => {
        if (index > cols - 1) {
          const temp = Math.min(...heights);
          const key = heights.indexOf(temp);
          splitPhotos[key].push(photo);
          heights[key] += photo.height / photo.width;
        }
      });
      console.log("Split photos", splitPhotos);
      this.splitPhotos = splitPhotos;
      if (Math.max(...this.columns.allowedSizes) === this.columns.amount) {
        this.text = false;
      } else this.text = true;
    },
    flipPhotos() {
      console.log("flip");
      this.order.reverse !== "-reverse"
        ? (this.order.reverse = "-reverse")
        : (this.order.reverse = "");
      this.order.justify !== "start"
        ? (this.order.justify = "start")
        : (this.order.justify = "end");
      this.order.icon !== "mdi-sort-descending"
        ? (this.order.icon = "mdi-sort-descending")
        : (this.order.icon = "mdi-sort-ascending");
    },
    initiatePhotos() {
      switch (this.$vuetify.breakpoint.name) {
        case "xl":
          this.splitPhotosV2(6);
          break;
        case "lg":
          this.splitPhotosV2(4);
          break;
        case "md":
          this.splitPhotosV2(3);
          break;
        case "sm":
        case "xs":
          this.splitPhotosV2(2);
          break;
      }
    }
  },
  created() {
    console.log(this.$vuetify.breakpoint.sm);
    setTimeout(() => (this.show = true), 1);
    window.addEventListener("resize", this.onResize);
  },
  mounted() {
    this.onResize();
    this.initiatePhotos();
    this.show = true;
  },
  watch: {
    photos: {
      handler: function(val, oldVal) {
        console.log("photos changed");
        this.photoSelected();
        this.onResize();
        this.initiatePhotos();
      }
    }
  },
  components: {
    Overlay,
    photoCard
  }
};
</script>

<style scoped>
.body {
  background-color: #383838;
  min-height: 100vh;
}
</style>
