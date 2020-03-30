import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import photos from "../components/photography/photos.vue";
import homepage from "../components/home.vue";
import Admin from "../components/Admin.vue";
import login from "../components/login.vue";
import isAuth from "../services/authenticate";
import locations from "../components/locations/locations.vue";
import location from "../components/locations/location.vue";
import contact from "../components/contact/contact.vue";
import prints from "../components/prints/print.vue";
import i18n from '../i18n.js';

console.log(i18n)

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: `/${i18n.locale}/portfolio`
  },
  {
    path: '/photography',
    redirect: `/${i18n.locale}/photography`
  },
  {
    path: '/photography/:file',
    redirect: `/${i18n.locale}/photography/:file`
  },
  {
    path: '/locations/',
    redirect: `/${i18n.locale}/locations/`
  },
  {
    path: '/locations/:location',
    redirect: `/${i18n.locale}/locations/:location`
  },
  {
    path: '/contact',
    redirect: `/${i18n.locale}/contact`
  },
  {
    path: '/prints',
    redirect: `/${i18n.locale}/prints`
  },
  {
    path: '/:lang',
    component: {
      render (c) { return c('router-view')}
    },
    children: [
      {
        path: "home",
        name: "home",
        component: Home
      },
      {
        path: "admin",
        name: "Admin",
        component: Admin,
        beforeEnter: async (to, from, next) => {
          console.log("isAuth: ", await isAuth());
          if (await isAuth()) {
            next();
          } else {
            next("/login");
          }
        }
      },
      {
        path: "photography",
        name: "Photography",
        component: photos,
        children: [
          {
            path: ":photo",
            name: "Photography",
            component: photos,
            props: true
          }
        ]
      },
      {
        path: "/",
        redirect: `/${i18n.locale}/portfolio`
      },
      {
        path: "portfolio",
        name: "Kaller",
        component: homepage
      },
      {
        path: "login",
        name: "Kaller",
        component: login
      },
      {
        path: "locations/:location",
        name: "Location",
        component: location,
      },
      {
        path: "locations",
        name: "Locations",
        component: locations,
      },
      {
        path: "contact",
        name: "Contacts",
        component: contact,
      },
      {
        path: "prints",
        name: "Prints",
        component: prints,
      },
    ]
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  mode: "history"
});



export default router;

router.beforeEach((to, from, next) => {

  // use the language from the routing param or default language
  let language = to.params.lang;
  if (!language) {
    language = 'en'
    if (localStorage.lang) {
      // this.$i18n.locale = localStorage.lang;
      language = localStorage.lang;
    }
  }
  
  

  // set the current language for i18n.
  i18n.locale = language
  console.log('LANGUAGE SET TO ',i18n.locale)
  next()
})