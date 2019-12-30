import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import photo from '../components/photo.vue'
import homepage from '../components/home.vue'
import api from '../services/getPhotos'

let photos = [];

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },
  {
    path: '/photography*',
    name: 'Photography',
    component: photo,
    beforeEnter (to, from, next) {
        next  (vm => {
          vm.requestPhotos();
          console.log('photos loaded');
      });
    },
  },
  {
    path: '/',
    name: 'Kaller',
    component: homepage
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

export default router
