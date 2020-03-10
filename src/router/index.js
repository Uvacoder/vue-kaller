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


Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/admin",
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
    path: "/photography",
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
    name: "Kaller",
    component: homepage
  },
  {
    path: "/login",
    name: "Kaller",
    component: login
  },
  {
    path: "/locations/:location",
    name: "Location",
    component: location,
  },
  {
    path: "/locations",
    name: "Locations",
    component: locations,
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  mode: "history"
});

export default router;
