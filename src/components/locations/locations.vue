<template>
  <div class="wrapper">
    <v-container>
      <v-row>
        <v-col :cols="12" :md="6" :lg="4" v-for="location in locations" v-bind:key="location.name">
          <v-hover v-slot:default="{ hover }">
            <v-card :class="`elevation-${hover ? 24 : 0}`">
              <v-img :aspect-ratio="2/1" :src="location.photo">
                <div class="d-flex align-center justify-center flex-column imgtext" color="white">
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
        }
      ]
    };
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

.imgtext {
  height: 100%;
}
</style>