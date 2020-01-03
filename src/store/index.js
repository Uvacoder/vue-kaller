import Vue from 'vue'
import Vuex from 'vuex'
import api from "../services/api.js";

Vue.use(Vuex);

const dev = "http://kaller.test";
const pro = "https://kallers.se";

export default new Vuex.Store({
  state: {
    host: '',
    photos: [],
    windowSize: {
      x: 0,
      y: 0
    }
  },
  mutations: {
    SET_PHOTOS (state,photos){
      state.photos = photos;
    },
    SET_WINDOW (state,window){
      console.log(window.x);
      state.windowSize = window;
    }
  },
  actions: {
    async getPhotos ({commit}){
      const photos = await api.post(null,'photos');
      console.log('Photos',photos);
      commit('SET_PHOTOS',photos);
    },
    getWindowSize ({commit}){
      const size = {x: window.innerWidth, y: window.innerHeight};
      console.log(size.x,size.y);
      commit('SET_WINDOW',size);
    }
  },
  modules: {
  }
})
