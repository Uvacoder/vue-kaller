import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import photo from '../components/photo.vue'

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
    path: '/photography/:id',
    name: 'Photography',
    component: photo
  },
  {
    path: '/photography*',
    name: 'Photography',
    component: photo
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

export default router
