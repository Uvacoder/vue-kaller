<template>
  <div class="mt-7">
    <v-container>
      <v-row>
        <div class="d-flex align-center justify-center ml-3">
          <v-btn @click="$router.push('/locations/')" height="48px" class="mr-2 pa-0">
            <v-icon class="pa-0">mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn
            @click="openInMaps()"
            v-show="!$vuetify.breakpoint.smAndDown"
            height="48px"
            class="mr-2 pa-0"
          >
            <v-icon class="pa-0">mdi-google-maps</v-icon>
          </v-btn>
        </div>
        <v-spacer></v-spacer>
        <v-col class="pa-3 ma-0 rounded test" :cols="7" :md="6" :lg="4">
          <div v-show="!$vuetify.breakpoint.smAndDown">
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
          <div v-if="$vuetify.breakpoint.smAndDown" class="d-flex justify-end">
            <v-btn @click="openInMaps()" height="48px" class="mr-2 pa-0">
              <v-icon class="pa-0">mdi-google-maps</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <div>
        <h1>{{location.name}}</h1>
        <v-img :src="location.photo"></v-img>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import "../../services/findKey.js";

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
  computed: {
    ...mapState(["locations", "windowSize"])
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
      console.log("hmmmmm");
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
</style>