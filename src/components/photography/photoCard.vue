<template>
  <v-card
    :class="{'mobilePhoto': $vuetify.breakpoint.smAndDown, 'pa-1 photocard ': true, 'disabled': true}"
    :ripple="!$vuetify.breakpoint.smAndDown"
  >
    <v-img
      v-show="!$vuetify.breakpoint.smAndDown"
      :src="$host + photo.path"
      :class="{'desktopPhoto': large}"
      :lazy-src="$host + photo.prepath"
      @click="click(photo)"
      :aspect-ratio="photo.width/photo.height"
      :alt="`Photograph ${photo.filename} was taken ${new Date(photo.date*1000).toLocaleDateString()} with ${photo.aperture} and ${photo.shutterspeed}s`"
    >
      <v-overlay absolute :value="hover">
        <v-icon @click="click(photo)" x-large>mdi-image-area</v-icon>
      </v-overlay>
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
        </v-row>
      </template>
    </v-img>
    <v-img
      v-show="$vuetify.breakpoint.smAndDown"
      :src="$host + photo.mobilepath"
      :class="{'desktopPhoto': large }"
      :lazy-src="$host + photo.prepath"
      :aspect-ratio="photo.width/photo.height"
      @click="click(photo)"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
        </v-row>
      </template>
    </v-img>

    <v-row v-show="text">
      <v-col cols="7" md="10" class="pa-0">
        <v-card-subtitle class="pl-4 pb-0 pt-2">{{photo.lens}}</v-card-subtitle>
        <v-card-text class="text--primary pa-0 pl-4">
          <div>{{photo.aperture}} and {{photo.shutterspeed}}s</div>
          <div>{{new Date(photo.date*1000).getDate()}}th {{months[new Date(photo.date*1000).getMonth()]}} {{new Date(photo.date*1000).getFullYear()}}</div>
          <!--                    <div>Photograph {{photo.filename}} was taken {{new Date(photo.date*1000).toLocaleDateString()}} with {{photo.aperture}} and {{photo.shutterspeed}}s</div>-->
        </v-card-text>
      </v-col>
      <v-spacer></v-spacer>
      <v-col
        cols="5"
        md="2"
        class="d-flex justify-end align-center"
        v-if="$vuetify.breakpoint.smAndDown"
      >
        <navigator-share
          v-bind:on-error="onError"
          :url="'https://kallers.se/photography/' + photo.filename"
          title="Kaller Creations"
          text
        >
          <v-btn color="primary">
            <v-icon size="20">mdi-share-variant</v-icon>
          </v-btn>
        </navigator-share>
        <a :download="photo.filename" :href="'https://kallers.se/images/2k/' + photo.filename">
          <v-btn color="primary" class="ml-2">
            <v-icon size="20">mdi-download</v-icon>
          </v-btn>
        </a>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import NavigatorShare from "vue-navigator-share";

export default {
  name: "photoCard",
  props: {
    photo: Object,
    click: Function,
    index: Number,
    large: Boolean,
    text: Boolean,
    hover: Boolean
  },
  components: {
    NavigatorShare
  },
  methods: {
    onError() {
      alert(
        "Please open this website in another browser, Chrome or Safari is recommended. This feature only works on mobile"
      );
    }
  },
  computed: {
    url() {
      return window.location.href;
    }
  },
  data: () => {
    return {
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]
    };
  }
};
</script>

<style scoped>
.photocard {
  width: 100%;
}
</style>