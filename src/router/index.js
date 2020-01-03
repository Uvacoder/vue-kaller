import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import photo from '../components/photo.vue'
import homepage from '../components/home.vue'
import Admin from '../components/Admin.vue'
import login from '../components/login.vue'
import isAuth from '../services/authenticate';

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter: async (to, from, next) => {
      console.log('isAuth: ',await isAuth());
      if(await isAuth()){
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/photography',
    name: 'Photography',
    component: photo,
  },
  {
    path: '/photography/:photo',
    name: 'Photography',
    component: photo,
    props: true
  },
  {
    path: '/',
    name: 'Kaller',
    component: homepage
  },
  {
    path: '/login',
    name: 'Kaller',
    component: login
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  mode: 'history'
});

export default router
