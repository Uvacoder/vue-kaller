<template>
  <div>
    <v-container>
      <v-row v-if="!$vuetify.breakpoint.xlOnly">
        <div class="d-flex align-center justify-center ml-3">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn @click="$router.push('/locations/')" height="48px" class="mr-2 pa-0" v-on="on">
                <v-icon class="pa-0">mdi-arrow-left</v-icon>
              </v-btn>
            </template>
            <span>Go back to locations</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                @click="openInMaps()"
                height="48px"
                class="mr-2 pa-0"
                color="primary"
              >
                <v-icon class="pa-0">mdi-google-maps</v-icon>
              </v-btn>
            </template>
            <span>Open {{location.name}} in google maps</span>
          </v-tooltip>
        </div>
        <v-spacer v-show="!$vuetify.breakpoint.smAndDown"></v-spacer>
        <v-col class="pa-3 ma-0 rounded test" :md="6" :lg="4">
          <div>
            <v-autocomplete
              :items="locationNames"
              @change="locationSearched"
              v-model="searchedLocation"
              label="Search location..."
              dense
              hide-details
              solo
              autocomplete="off"
              height="48px"
            ></v-autocomplete>
          </div>
        </v-col>
      </v-row>
      <v-row ref="sidebar">
        <v-col xl="8" order="2" order-xl="1">
          <locationHeader :location="location" v-show="$vuetify.breakpoint.xlOnly"></locationHeader>
          <div>
            <v-card dark class="pa-2">
              <masonry :cols="$vuetify.breakpoint.lgAndUp ? 3 : 2">
                <v-card
                  light
                  class="pa-1 ma-2"
                  v-for="(photo, index) in location.photos"
                  :key="index"
                  @click="$router.push('/photography/' + photo)"
                >
                  <v-img :src="'https://kallers.se/images/2k/'+photo"></v-img>
                </v-card>
              </masonry>
            </v-card>
          </div>
        </v-col>
        <v-col cols="12" xl="4" order="1" order-xl="2">
          <locationHeader :location="location" v-show="!$vuetify.breakpoint.xlOnly"></locationHeader>
          <div v-show="$vuetify.breakpoint.xlOnly">
            <v-autocomplete
              :items="locationNames"
              @change="locationSearched"
              v-model="searchedLocation"
              label="Search location..."
              dense
              hide-details
              solo
              autocomplete="off"
              height="48px"
              class="mb-5"
            ></v-autocomplete>
          </div>
          <locationText :location="location"></locationText>
          <v-card dark class="my-4" v-for="src in location.youtube" v-bind:key="src">
            <v-responsive :aspect-ratio="16/9" class="pa-2">
              <iframe width="100%" height="100%" :src="src" frameborder="0" allow allowfullscreen></iframe>
            </v-responsive>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import "../../services/findKey.js";
import "../../services/unswedifyString.js";
import locationHeader from "./header";
import locationText from "./text";

export default {
  name: "Location",
  data() {
    return {
      location: {},
      locationNames: [],
      searchedLocation: "",
      order: {
        reverse: "",
        justify: "start",
        icon: "mdi-sort-descending"
      }
    };
  },
  components: {
    locationHeader,
    locationText
  },
  computed: {
    ...mapState(["locations", "windowSize", "photos"])
  },
  created() {
    console.log("HELLO?????", this.$route.params.location);
  },
  mounted() {
    this.selectedLocation();
    this.getNames();
  },
  methods: {
    selectedLocation() {
      if (this.locations) {
        this.locations
          .findKey(this.$route.params.location, "name")
          .then(location => {
            if (location) {
              console.log("LOCATION SELECTED", location);
              this.location = location;
              this.searchedLocation = location.name;
              this.$vuetify.goTo(-1000);
            }
          });
      }
    },
    getNames() {
      this.locations.map(object => {
        this.locationNames.push(object.name);
      });
    },
    locationSearched() {
      if (this.location) {
        this.$router.push("/locations/" + this.searchedLocation);
      }
    },
    openInMaps() {
      window.open(
        "https://www.google.com/maps/search/?api=1&query=" + this.location.name,
        "_blank"
      );
    }
  },
  watch: {
    locations: {
      handler: function(val, oldVal) {
        this.selectedLocation();
        this.getNames();
      }
    },
    $route: {
      handler: function(val, oldVal) {
        this.selectedLocation();
        this.getNames();
      }
    }
  }
};
</script>

<style scoped>
.photos {
  min-height: 300px;
  max-height: 1000px;
}
</style>