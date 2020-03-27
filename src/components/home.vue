<template>
  <div class="mb-n12 pb-0">
    <v-container fluid class="pb-0">
      <v-row>
        <v-col class="full-height pa-0 tiles" height="40px" cols="12" lg="8">
          <v-card color="white" class="pa-0" tile>
            <v-img
              src="https://kallers.se/images/2k/_MK24699-Pano.jpg"
              gradient="to top right, rgba(0,0,0,.5), rgba(0,0,0,.5)"
              cover
              :height="$vuetify.breakpoint.lgAndUp ? windowSize.y*0.8/2 : windowSize.y*0.84/3"
            >
              <div class="d-flex align-center justify-center flex-column fill-height" color="white">
                <p
                  class="display-2 font-weight-light white--text text-center"
                >{{$t('home.landscape.name')}}</p>
                <v-btn
                  x-large
                  :to="'/'+$i18n.locale+'/photography'"
                  outlined
                  color="white"
                >{{$t('home.landscape.action')}}</v-btn>
              </div>
            </v-img>
          </v-card>
          <v-card color="white" :class="$vuetify.breakpoint.lgAndUp ? 'pt-1' : 'pt-1'" tile>
            <v-img
              src="https://kallers.se/images/2k/MK202302-HDR-Pano.jpg"
              gradient="to top right, rgba(0,0,0,.5), rgba(0,0,0,.5)"
              cover
              :height="$vuetify.breakpoint.lgAndUp ? windowSize.y*0.8/2 : windowSize.y*0.84/3"
            >
              <div class="d-flex align-center justify-center flex-column fill-height" color="white">
                <p class="display-2 font-weight-light white--text">Martin Kaller</p>
                <v-btn
                  x-large
                  :to="'/'+$i18n.locale+'/contact'"
                  outlined
                  color="white"
                >{{$t('home.contact.action')}}</v-btn>
              </div>
            </v-img>
          </v-card>
        </v-col>
        <v-col class="full-height pa-0 tiles" cols="12" lg="4">
          <v-card color="white" :class="$vuetify.breakpoint.lgAndUp ? 'pl-1' : 'pt-1'" tile>
            <v-img
              src="https://kallers.se/images/2k/_MK26160.jpg"
              gradient="to top right, rgba(0,0,0,.4), rgba(0,0,0,.4)"
              cover
              :height="$vuetify.breakpoint.lgAndUp ? windowSize.y*0.8+4 : windowSize.y*0.84/3"
            >
              <div class="d-flex align-center justify-center flex-column fill-height" color="white">
                <p class="display-2 font-weight-light white--text">{{$t('home.locations.name')}}</p>
                <v-btn
                  x-large
                  :to="'/'+$i18n.locale+'/locations'"
                  outlined
                  color="white"
                >{{$t('home.locations.action')}}</v-btn>
              </div>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import api from "../services/api.js";
import NavigatorShare from "vue-navigator-share";
import { mapState } from "vuex";

export default {
  name: "home",
  data() {
    return {
      photos: []
    };
  },
  methods: {
    async requestPhotos() {
      this.photos = await api.post({ limit: "" }, "homepagephotos");
    },
    test() {
      console.log(this.windowSize);
    },
    onError(err) {
      alert(err);
      console.log(err);
    },
    onSuccess(err) {
      console.log(err);
    }
  },
  created() {
    this.requestPhotos();
  },
  mounted() {},
  components: {
    NavigatorShare
  },
  computed: {
    url() {
      return window.location.href;
    },
    title() {
      return document.title;
    },
    ...mapState(["windowSize"])
  }
};
</script>

<style scoped>
.header {
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cardaction {
  border: 2px solid black !important;
}

.wrapper {
  background-color: #383838;
  height: 90vh;
}
</style>