<template>
  <div>
    <v-container class="mt-2">
      <v-row>
        <v-col cols="12" md="12" lg="7" xl="8">
          <v-card dark class="pa-2 mb-2">
            <p class="display-3">Martin Kaller</p>
            <p
              class="body-1"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam fermentum, augue sed dapibus ultrices, velit sem laoreet tortor, at ornare est justo a est. Nulla iaculis erat ligula, sit amet aliquam sapien iaculis accumsan. Pellentesque imperdiet sed est at lacinia. Donec auctor, nulla id faucibus viverra, ipsum sapien elementum velit, at luctus mi mi a ipsum. Nam et quam non risus luctus imperdiet. Vestibulum et dictum orci. Mauris vehicula, nunc ultricies posuere tincidunt, eros sapien placerat nulla, a lobortis velit nunc eget mi. Phasellus et libero porta, luctus metus vel, auctor neque. Nullam malesuada magna quis risus aliquet, eget maximus odio viverra. Fusce tincidunt posuere metus, a fermentum libero ornare non. Nam sapien leo, cursus a lacinia ut, volutpat eget nunc. Duis tempor mi mauris, in posuere diam gravida ut. Donec auctor sodales sem. Integer bibendum ipsum eu tortor volutpat, feugiat facilisis lorem posuere. Ut cursus egestas nisi ac facilisis. Fusce malesuada nisl ut condimentum maximus.</p>
          </v-card>
          <v-card v-if="false" dark class="pa-2 mb-2">
            <v-col>
              <v-row v-for="media in medias" v-bind:key="media.text" class="pa-1" justify="start">
                <v-col cols="auto" class="pa-0">
                  <v-btn fab :color="media.color" :href="media.link" target="_blank">
                    <v-icon size="35">{{ media.icon }}</v-icon>
                  </v-btn>
                </v-col>
                <v-col class="d-flex align-center">
                  <span class="title font-weight-light">{{media.text}}</span>
                </v-col>
              </v-row>
            </v-col>
          </v-card>
          <v-card dark v-if="userLang.includes('')">
            <!-- <v-card-title class="text-center justify-center py-6">
              <h1 class="font-weight-bold display-3 basil--text"></h1>
            </v-card-title>-->

            <v-tabs v-model="tab" centered grow>
              <v-tab v-for="service in services" :key="service.name">{{ service.name }}</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item v-for="service in services" :key="service.name">
                <v-card dark tile>
                  <v-card-text>{{service.text}}</v-card-text>
                  <masonry :cols="3">
                    <v-card
                      light
                      class="pa-1 ma-2"
                      v-for="(photo, index) in service.photos"
                      :key="index"
                    >
                      <v-img :src="photo"></v-img>
                    </v-card>
                  </masonry>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
        <v-col cols="12" md="12" lg="5" xl="4">
          <v-card class="pa-2" dark>
            <v-img src="https://kallers.se/images/assets/portrait.jpg"></v-img>
          </v-card>
          <v-card dark class="pa-2 mt-2">
            <v-col>
              <v-row v-for="media in medias" v-bind:key="media.text" class="pa-1" justify="start">
                <v-col cols="auto" class="pa-0">
                  <v-btn fab :color="media.color" :href="media.link" target="_blank">
                    <v-icon size="35">{{ media.icon }}</v-icon>
                  </v-btn>
                </v-col>
                <v-col class="pa-0 pl-3 d-flex align-start justify-center flex-column">
                  <span class="title font-weight-light">{{media.text}}</span>
                  <span class="caption font-weight-light">{{media.type}}</span>
                </v-col>
              </v-row>
            </v-col>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      medias: [
        {
          icon: "mdi-instagram",
          text: "kallercreations",
          link: "https://www.instagram.com/kallercreations/",
          color: "purple darken-1",
          type: "Instagram"
        },
        {
          icon: "mdi-email-outline",
          text: "fotograf@kallers.se",
          link: "mailto:fotograf@kallers.se",
          color: "amber darken-1",
          type: "Email"
        },
        {
          icon: "mdi-facebook",
          text: "Kaller Creations",
          link: "https://www.facebook.com/kallercreations/",
          color: "primary",
          type: "Facebook"
        },
        {
          icon: "mdi-youtube",
          text: "Martin Kaller",
          link:
            "https://www.youtube.com/channel/UCOzKsFDGejQsLdklgMvm72A?view_as=subscriber",
          color: "red",
          type: "Youtube"
        },
        {
          icon: "mdi-google-maps",
          text: "Local guide",
          link: "https://www.google.se/maps/contrib/106633097459000923158",
          color: "green darken-1",
          type: "Local guide"
        }
      ],
      items: ["Landskapsfotografering", "Drönarfotografering", "Porträtt"],
      services: [
        {
          name: "Landskap",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam fermentum, augue sed dapibus ultrices, velit sem laoreet tortor, at ornare est justo a est. Nulla iaculis erat ligula, sit amet aliquam sapien iaculis accumsan. Pellentesque imperdiet sed est at lacinia. Donec auctor, nulla id faucibus viverra, ipsum sapien elementum velit, at luctus mi mi a ipsum. Nam et quam non risus luctus imperdiet.",
          photos: [
            "https://kallers.se/images/assets/landscape2.jpg",
            "https://kallers.se/images/assets/landscape4.jpg",
            "https://kallers.se/images/assets/landscape6.jpg"
          ]
        },
        {
          name: "Flygfoto",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam fermentum, augue sed dapibus ultrices, velit sem laoreet tortor, at ornare est justo a est. Nulla iaculis erat ligula, sit amet aliquam sapien iaculis accumsan. Pellentesque imperdiet sed est at lacinia. Donec auctor, nulla id faucibus viverra, ipsum sapien elementum velit, at luctus mi mi a ipsum. Nam et quam non risus luctus imperdiet.",
          photos: [
            "https://kallers.se/images/2k/DJI_0040.jpg",
            "https://kallers.se/images/2k/DJI_0030.jpg",
            "https://kallers.se/images/2k/DJI_0301.jpg"
          ]
        },
        {
          name: "Interiörer",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam fermentum, augue sed dapibus ultrices, velit sem laoreet tortor, at ornare est justo a est. Nulla iaculis erat ligula, sit amet aliquam sapien iaculis accumsan. Pellentesque imperdiet sed est at lacinia. Donec auctor, nulla id faucibus viverra, ipsum sapien elementum velit, at luctus mi mi a ipsum. Nam et quam non risus luctus imperdiet.",
          photos: [
            "https://kallers.se/images/assets/interior3.jpg",
            "https://kallers.se/images/assets/interior4.jpg",
            "https://kallers.se/images/assets/interior5.jpg"
          ]
        }
      ],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      tab: null
    };
  },
  computed: {
    userLang: () => {
      return navigator.language || navigator.userLanguage;
    }
  }
};
</script>

<style scoped>
* {
  /* outline: black 1px solid; */
}
</style>