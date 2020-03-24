<template>
  <v-app>
    <v-app-bar dark fixed class="hidden-sm-and-down">
      <v-toolbar-title>Kaller Creations</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-tabs v-model="tab" centered grow height="64">
          <v-tab v-for="nav in navs" :to="nav.to" :key="nav.to" class="white--text">{{nav.name}}</v-tab>
        </v-tabs>
        <!-- <v-btn to="/" text>Portfolio</v-btn>
        <v-btn to="/photography" text>Photography</v-btn>
        <v-btn to="/locations" text>Locations</v-btn>
        <v-btn to="/contact" text>Contact</v-btn>
        <v-btn to="/admin" text>Dashboard</v-btn>-->
      </v-toolbar-items>
    </v-app-bar>

    <v-app-bar dark fixed :hide-on-scroll="false" height="64" class="hidden-md-and-up">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title class="pr-2">Kaller Creations</v-toolbar-title>
      <navigator-share v-bind:on-error="onError" :url="url" title="Kaller Creations" text>
        <v-icon>mdi-share-variant</v-icon>
      </navigator-share>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" temporary dark>
      <!-- <v-toolbar-items class="navDrawerTab">
        <v-tabs v-model="tab" vertical class="navDrawerTab" style="width: 100%">
          <v-tab
            v-for="nav in navs"
            :to="nav.to"
            :key="nav.to"
            class="white--text text-left navDrawerTab"
            style="width: 100%"
          >
            <span class="text-left headline">{{nav.name}}</span>
          </v-tab>
        </v-tabs>
      </v-toolbar-items>-->
      <v-list nav>
        <v-list-item-group>
          <v-list-item v-for="nav in navs" :to="nav.to" :key="nav.to">
            <v-list-item-title class="title font-weight-light">{{nav.name}}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <!-- <template v-slot:append>
        <div class="pa-10">
          <v-btn block>Logout</v-btn>
        </div>
      </template>-->
    </v-navigation-drawer>
    <!-- <div class="navspacer"></div> -->
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view class="pt-12" />
      </keep-alive>
    </transition>
    <v-footer dark padless class="mt-12 d-flex justify-center">
      <v-card flat tile class="grey darken-4 white--text pb-1 text-center">
        <v-card-text class="pb-2">
          <v-tooltip top v-for="icon in icons" :key="icon.link">
            <template v-slot:activator="{ on }">
              <v-btn class="mx-4 white--text" :href="icon.link" target="_blank" icon v-on="on">
                <v-icon size="24px">{{ icon.icon }}</v-icon>
              </v-btn>
            </template>
            <span>{{icon.type}}</span>
          </v-tooltip>
        </v-card-text>

        <v-card-text class="white--text pt-0 pb-0">
          Martin Kaller, swedish based landscape photographer sharing his photography journey. Photographs are shot with Sony A7II together with the FE 16-35 F4 or Canon 70-200 F4.
          To capture the wonder of the landscapes I enjoy being out before the sun is up. As the sun rises my camera is mounted on the tripod and I'm ready to capture the beauty of the scene.
          Usually my photographs are around water, I think it helps lift the composition. My goal is to share the beauty of nature and what it has to offer, as well as sharing some of my favorite spots mainly around Linköping but also the whole of Sweden.
        </v-card-text>
        <v-card-text class="white--text pt-0 pb-0">
          Martin Kaller, Linköpings baserad landskapsfotograf som delar sitt fotograferande.
          Jag fotar med en Sony A7II tillsammans med en FE 16-35 F4 eller en Canon 70-200 F4. För att fånga landskapets tycker jag om att vara ute innan solen är uppe.
          När solen går upp är min kamera på stativet och jag är redo att fånga landskapets skönhet. Vanligtvis är mina fotografier tagna runt vatten, jag tror att det hjälper till att lyfta kompositionen.
          Mitt mål är att dela naturens skönhet och vad den har att erbjuda, samt att dela några av mina favorit fotoplatser främst runt Linköping, Östergötland men också hela Sverige.
        </v-card-text>
        <!-- <v-card-text
          class="white--text pt-0"
        >Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </v-card-text>-->
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import NavigatorShare from "vue-navigator-share";

export default {
  name: "App",

  data: () => ({
    drawer: false,
    start: false,
    icons: [
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
    navs: [
      {
        name: "Portfolio",
        to: "/"
      },
      {
        name: "Photography",
        to: "/photography"
      },
      {
        name: "Locations",
        to: "locations"
      },
      {
        name: "Contact",
        to: "/contact"
      },
      {
        name: "Dashboard",
        to: "/admin"
      }
    ]
  }),
  components: {
    NavigatorShare
  },
  computed: {
    url() {
      return window.location.href;
    },
    title() {
      return document.title;
    }
  },
  methods: {
    onError() {
      console.log("Navigatorshare not supported");
    }
  },
  mounted() {
    this.start = true;
  }
};
</script>

<style>
.navDrawerTab {
  /* width: 300px !important; */
}

.navDrawer {
  position: fixed !important;
}

.v-list-item-title {
  color: red !important;
}

body::-webkit-scrollbar {
  width: 3px;
}

body::-webkit-scrollbar * {
  background: transparent;
}

body::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.8) !important;
}

body {
  background-color: #383838;
}
#app {
  background-color: #383838;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
