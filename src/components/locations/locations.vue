<template>
  <div class="wrapper">
    <v-container>
      <v-row>
        <v-col>
          <v-btn @click="flipLocations()" height="48px" class="mr-2 pa-0">
            <v-icon class="pa-0">{{order.icon}}</v-icon>
          </v-btn>
        </v-col>
        <v-col height="48px" class="pa-3 ma-0 rounded test" :cols="12" :md="6" :lg="4">
          <div>
            <v-autocomplete
              :items="locationNames"
              @change="locationSearched"
              v-model="selectedLocation"
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
      <v-row :class="'justify-end'">
        <v-col
          :cols="12"
          :md="6"
          :lg="4"
          v-for="location in locations"
          v-bind:key="location.name"
          class="pa-3"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card
              :class="`elevation-${hover ? 24 : 0}`"
              @click="$router.push('/locations/' + location.name)"
            >
              <v-img
                :aspect-ratio="7/4"
                :src="location.photo"
                class="imgtext"
                gradient="to top right, rgba(0,0,0,.3), rgba(0,0,0,.3)"
              >
                <div
                  class="d-flex align-center justify-center flex-column fill-height"
                  color="white"
                >
                  <p class="display-2 font-weight-light white--text ma-0">{{location.name}}</p>
                  <p class="headline white--text">{{location.coords}}</p>
                </div>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Locations",
  data() {
    return {
      locationNames: [],
      selectedLocation: "",
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
  methods: {
    getNames() {
      this.locations.map(object => {
        this.locationNames.push(object.name);
      });
    },
    locationSearched() {
      console.log("LOCATION SELECTED", this.selectedLocation);
      if (this.selectedLocation) {
        this.$router.push("/locations/" + this.selectedLocation);
      }
    },
    flipLocations() {
      //flips the order of the columns with flex
      this.order.icon !== "mdi-sort-descending"
        ? (this.order.icon = "mdi-sort-descending")
        : (this.order.icon = "mdi-sort-ascending");
      this.locations.reverse();
    }
  },
  mounted() {
    this.getNames();
    console.log(this.locations);
  },
  watch: {
    locations: {
      handler: function(val, oldVal) {
        console.log(val);
        this.getNames();
      }
    }
  }
};
</script>

<style scoped>
.wrapper {
  margin-top: 50px;
}

/* * {
  outline: 1px solid black;
} */

.searchBar {
  background-color: #f5f5f5;
  border-radius: 4px;
}

.imgtext {
  /* background: linear-gradient(90deg, rgba(0, 0, 255, 1), rgba(0, 0, 255, 1)); */
}
</style>