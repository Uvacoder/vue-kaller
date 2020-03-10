<template>
  <div class="wrapper">
    <v-container>
      <v-row>
        <v-col height="48px" class="pa-3 ma-0 rounded test" :cols="12" :md="6" :lg="4">
          <div>
            <v-autocomplete
              :items="locationNames"
              @change="locationSearched"
              v-model="selectedLocation"
              solo
            ></v-autocomplete>
          </div>
        </v-col>
      </v-row>
      <v-row>
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
                  <p class="display-3 white--text ma-0">{{location.name}}</p>
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
export default {
  name: "Locations",
  data() {
    return {
      locations: [
        {
          photo: "https://kallers.se/images/low/DJI_0353.jpg",
          coords: `58°09'47.4"N 15°40'10.8"E`,
          name: "Hackelboön"
        },
        {
          photo: "https://kallers.se/images/low/_MK29525.jpg",
          coords: `58°09'47.4"N 15°40'10.8"E`,
          name: "Omberg"
        },
        {
          photo: "https://kallers.se/images/low/_MK26160.jpg",
          coords: `58°09'47.4"N 15°40'10.8"E`,
          name: "Häradskär"
        },
        {
          photo: "https://kallers.se/images/low/P1410002-HDR.jpg",
          coords: `58°09'47.4"N 15°40'10.8"E`,
          name: "Göta Kanal"
        },
        {
          photo: "https://kallers.se/images/low/_MK27876-Redigera.jpg",
          coords: `58°09'47.4"N 15°40'10.8"E`,
          name: "Haverdal"
        },
        {
          photo: "https://kallers.se/images/low/_MK20389-Redigera.jpg",
          coords: `58°09'47.4"N 15°40'10.8"E`,
          name: "Rosenkällasjön"
        },
        {
          photo: "https://kallers.se/images/low/_MK29852.jpg",
          coords: `58°09'47.4"N 15°40'10.8"E`,
          name: "Getåravinen"
        },
        {
          photo: "https://kallers.se/images/low/_MK27964-Pano.jpg",
          coords: `58°09'47.4"N 15°40'10.8"E`,
          name: "Söderåsen"
        },
        {
          photo: "https://kallers.se/images/low/_MK27675-Redigera.jpg",
          coords: `58°09'47.4"N 15°40'10.8"E`,
          name: "Hovshallar"
        }
      ],
      locationNames: [],
      selectedLocation: ""
    };
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
    }
  },
  mounted() {
    this.getNames();
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