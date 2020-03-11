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
    },
    locations: [],
  },
  mutations: {
    SET_PHOTOS(state, photos) {
      state.photos = photos;
    },
    SET_WINDOW(state, window) {
      console.log(window.x);
      state.windowSize = window;
    },
    SET_LOCATIONS(state, locations) {
      state.locations = locations
    }
  },
  actions: {
    async getPhotos({ commit }) {
      if (localStorage.photos) {
        commit('SET_PHOTOS', JSON.parse(localStorage.photos));
      }
      const photos = await api.post(null, 'photos');
      console.log('Photos', photos);
      localStorage.photos = JSON.stringify(photos);
      commit('SET_PHOTOS', photos);
    },
    getWindowSize({ commit }) {
      const size = { x: window.innerWidth, y: window.innerHeight };
      console.log(size.x, size.y);
      commit('SET_WINDOW', size);
    },
    getLocations({ commit }) {
      const locations = [
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
        },
        {
          photo: "https://kallers.se/images/low/_MK27876-Redigera.jpg",
          coords: `58°09'47.4"N 15°40'10.8"E`,
          name: "Tylösand"
        },
        {
          photo: "https://kallers.se/images/low/_MK20389-Redigera.jpg",
          coords: `58°09'47.4"N 15°40'10.8"E`,
          name: "Rosenkällasjön"
        },
        {
          photo: "https://kallers.se/images/low/_MK29852.jpg",
          coords: `58°09'47.4"N 15°40'10.8"E`,
          name: "Getåravinen"
        },
        {
          photo: "https://kallers.se/images/low/_MK27964-Pano.jpg",
          coords: `58°09'47.4"N 15°40'10.8"E`,
          name: "Söderåsen"
        },
        {
          photo: "https://kallers.se/images/low/_MK27675-Redigera.jpg",
          coords: `58°09'47.4"N 15°40'10.8"E`,
          name: "Hovshallar"
        },
        {
          photo: "https://kallers.se/images/low/_MK27468.jpg",
          coords: `58°09'47.4"N 15°40'10.8"E`,
          name: "Städjan"
        },
        {
          photo: "https://kallers.se/images/low/_MK27217.jpg",
          coords: `58°09'47.4"N 15°40'10.8"E`,
          name: "Fulufjället"
        },
        {
          photo: "https://kallers.se/images/low/DJI_0336.jpg",
          coords: `58°09'47.4"N 15°40'10.8"E`,
          name: "Viggeby"
        }
      ];
      console.log('locations set')
      commit('SET_LOCATIONS', locations);
    }
  },
  modules: {
  }
})
