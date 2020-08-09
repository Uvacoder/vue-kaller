<template>
  <v-app>
    <v-app-bar dark fixed class="hidden-sm-and-down">
      <v-toolbar-title>Kaller Creations</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-tabs centered grow height="64">
          <v-tab
            v-for="nav in navs"
            :to="'/'+$i18n.locale+nav.to"
            :key="nav.to"
            class="white--text"
            v-model="tab"
          >{{$t(nav.name)}}</v-tab>
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
      <v-list nav>
        <v-list-item-group>
          <v-list-item v-for="nav in navs" :to="'/'+$i18n.locale+nav.to" :key="nav.to">
            <v-list-item-title class="title font-weight-light">{{$t(nav.name)}}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn color="primary" block dark @click="languageDialog = true">Change language</v-btn>
        </div>
      </template>
      <!-- <template v-slot:append>
        <div class="pa-10">
          <v-btn block>Logout</v-btn>
        </div>
      </template>-->
    </v-navigation-drawer>
    <!-- <div class="navspacer"></div> -->
    <v-content>
      <transition name="fade" mode="out-in">
        <keep-alive>
          <router-view class="pt-12 full" />
        </keep-alive>
      </transition>
    </v-content>
    <v-footer dark padless class="d-flex justify-center">
      <v-card flat tile class="grey darken-4 white--text pb-1">
        <v-card-text class="pb-2 text-center">
          <v-tooltip top v-for="icon in icons" :key="icon.link">
            <template v-slot:activator="{ on }">
              <v-btn class="mx-4 white--text" :href="icon.link" target="_blank" icon v-on="on">
                <v-icon size="24px">{{ icon.icon }}</v-icon>
              </v-btn>
            </template>
            <span>{{icon.type}}</span>
          </v-tooltip>
        </v-card-text>

        <v-card-text class="white--text pt-0 pb-9">{{$t("footer.about")}}</v-card-text>
      </v-card>
      <v-dialog v-model="languageDialog" scrollable max-width="300px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" block dark tile v-on="on">Change language</v-btn>
        </template>
        <v-card style="min-height:400px">
          <v-card-title>Select language</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-radio-group v-model="languageSelected" column>
              <v-radio label="English" value="en"></v-radio>
              <v-radio label="Svenska" value="sv"></v-radio>
            </v-radio-group>
          </v-card-text>
          <v-card-text>{{$t('legal')}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="save()">Save and agree</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
    tab: 0,
    languageSelected: "en",
    languageDialog: false,
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
        name: "navs.portfolio",
        to: "/portfolio"
      },
      {
        name: "navs.photography",
        to: "/photography"
      },
      {
        name: "navs.locations",
        to: "/locations"
      },
      {
        name: "navs.contact",
        to: "/contact"
      },
      {
        name: "navs.prints",
        to: "/prints"
      },
      {
        name: "navs.dashboard",
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
    },
    save() {
      this.$i18n.locale = this.languageSelected;
      let route = this.$route;
      let lang = this.$i18n.locale;
      route.params.lang = lang;
      localStorage.lang = lang;
      if (!route.path.includes(lang)) this.$router.push(route);
      this.languageDialog = false;
    }
  },
  mounted() {
    this.start = true;
    if (localStorage.lang) {
      // this.$i18n.locale = localStorage.lang;
      this.languageSelected = this.$i18n.locale;
    } else this.languageDialog = true;
    console.log(this.$i18n.locale);
  },
  watch: {
    languageSelected: {
      handler: function(val, oldVal) {
        this.$i18n.locale = val;
      }
    }
  }
};
</script>

<style>
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
  min-height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
