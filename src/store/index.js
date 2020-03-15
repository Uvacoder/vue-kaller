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
          coords: `58°09'47.4"N 15°40'10.8"E`,
          name: "Hackelboön",
          rating: 3,
          photos: [
            "DJI_0353.jpg",
            "DJI_0357.jpg",
            "_MK20319-Redigera.jpg",
            "_MK20314.jpg",
            "_MK24522.jpg"
          ],
          history: [
            '28th February 2020',
            '4th February 2020',
            '12th October 2019'
          ],
          paragrafs: [
            'Hackelboöns naturreservat ligger längst med väg 34 mot rimforsa. Precis vid vägen ligger rastplatsen och entren till naturreservatet. Därifrån är det bara någon hundra meter innan man möts av fina vyer. Pågrund av att det är en ö så finns det vyer lite åt alla håll',
            'Det finns en del kompositioner att fota där. Utåt över sjön kan det vara lite svårt då det inte finns så många motiv, men det kan även skapa en väldigt minimalistisk bild.',
            'Jag har 30 minuter till hackelboön och väljer ofta det när jag vill till något fint ställe att fota som jag inte behöver köra för länge till'
          ],
          youtube: [
            'https://www.youtube.com/embed/RKhB3zd_d5Q'
          ]
        },
        {
          coords: `58°20'00.3"N 14°38'52.6"E`,
          name: "Omberg",
          rating: 4.7,
          photos: [
            "_MK21460.jpg",
            "_MK29525.jpg",
            "_MK21028-Redigera.jpg",
            "_MK20983.jpg",
            "_MK29970.jpg",
            "_MK29926.jpg",
            "_MK29920.jpg",
            "_MK29781.jpg",
            "_MK29760.jpg",
            "_MK29727.jpg",
            "_MK29718.jpg",
            "_MK29679.jpg",
            "_MK29525.jpg",
            "_MK29456.jpg",
            "_MK29370.jpg",
            "_MK29115.jpg",
            "_MK28996.jpg",
            "_MK28964.jpg",
            "_MK28956-Pano.jpg"
          ],
          paragrafs: ["Omberg ligger i Östergötland vid Vätterns strand och är landets artrikaste skogslandskap med många sällsynta naturmiljöer. Den vackra bokskogen i sluttningen ner mot Vättern, jätteekarna i beteslandskapet och de färgsprakande slåtterängarna är några av dem.", "En milslång rasbrant med naturskogar sätter också stor prägel på landskapet. Du kan njuta av den fantastiska utsikten från Hjässan - Ombergs högsta punkt - och vandra bland jätteekar och månghundraåriga granar eller låta dig fängslas av de vackra orkidéerna som finns i Ombergs många kalkkärr."
          ],
          history: [
            '28th February 2020',
            '4th February 2020',
            '12th October 2019'
          ],
        },
        {
          coords: `58°09'47.4"N 15°40'10.8"E`,
          name: "Häradsskär",
          rating: 3.5,
          photos: [
            "_MK26160.jpg",
            "_MK26124.jpg",
            "_MK26249.jpg",
          ],
          paragrafs: [
            'Längst ut i det Östgötska havsbandet ligger ön Häradskär. Ön har varit en välkänd fiskeplats sedan början av medeltiden. Landskapet är flackt och består av två skär som är förbundna av en spång. Under flera århundraden har människor levt och arbetat här, alltid lika beroende av vädrets makter.',
            'Häradskärs fyr är belägen på Stångskär, vars namn kommer från att man under 1600-talet använde en tunna på en stång som navigationsmärke på ön. År 1745 uppförde Norrköpings stad en drygt 25m hög åttakantig träbåk på skäret, vars grundstenar finns kvar än idag.'
          ],
          history: [
            '28th February 2020',
            '4th February 2020',
            '12th October 2019'
          ],
        },
        {
          coords: `58°09'47.4"N 15°40'10.8"E`,
          name: "Göta Kanal",
          rating: 3.4,
          photos: [
            "P1410002-HDR.jpg",
            "DJI_0357.jpg",
            "DJI_0353.jpg",
            "_MK20319-Redigera.jpg",
            "_MK20314.jpg",
            "_MK20319-Redigera.jpg",
          ],
          history: [
            '28th February 2020',
            '4th February 2020',
            '12th October 2019'
          ],
        },
        {
          coords: `58°09'47.4"N 15°40'10.8"E`,
          name: "Tylösand",
          rating: 4,
          photos: [
            "_MK27876-Redigera.jpg",
            "DJI_0357.jpg",
            "DJI_0353.jpg",
            "_MK20319-Redigera.jpg",
            "_MK20314.jpg",
            "_MK20319-Redigera.jpg",
          ],
          history: [
            '28th February 2020',
            '4th February 2020',
            '12th October 2019'
          ],
        },
        {
          coords: `58°09'47.4"N 15°40'10.8"E`,
          name: "Rosenkällasjön",
          rating: 1.5,
          photos: [
            "_MK20389-Redigera.jpg",
            "DJI_0357.jpg",
            "DJI_0353.jpg",
            "_MK20319-Redigera.jpg",
            "_MK20314.jpg",
            "_MK20319-Redigera.jpg",
          ],
          history: [
            '28th February 2020',
            '4th February 2020',
            '12th October 2019'
          ],
        },
        {
          coords: `58°09'47.4"N 15°40'10.8"E`,
          name: "Getåravinen",
          rating: 3,
          photos: [
            "_MK29852.jpg",
            "DJI_0357.jpg",
            "DJI_0353.jpg",
            "_MK20319-Redigera.jpg",
            "_MK20314.jpg",
            "_MK20319-Redigera.jpg",
          ],
          history: [
            '28th February 2020',
            '4th February 2020',
            '12th October 2019'
          ],
        },
        {
          coords: `58°09'47.4"N 15°40'10.8"E`,
          name: "Söderåsen",
          rating: 3,
          photos: [
            "_MK27964-Pano.jpg",
            "DJI_0357.jpg",
            "DJI_0353.jpg",
            "_MK20319-Redigera.jpg",
            "_MK20314.jpg",
            "_MK20319-Redigera.jpg",
          ],
          history: [
            '28th February 2020',
            '4th February 2020',
            '12th October 2019'
          ],
        },
        {
          coords: `58°09'47.4"N 15°40'10.8"E`,
          name: "Hovshallar",
          rating: 4.5,
          photos: [
            "_MK27675-Redigera.jpg",
            "DJI_0357.jpg",
            "DJI_0353.jpg",
            "_MK20319-Redigera.jpg",
            "_MK20314.jpg",
            "_MK20319-Redigera.jpg",
          ],
          history: [
            '28th February 2020',
            '4th February 2020',
            '12th October 2019'
          ],
        },
        {
          coords: `58°09'47.4"N 15°40'10.8"E`,
          name: "Städjan",
          rating: 4.8,
          photos: [
            "_MK27468.jpg",
            "DJI_0357.jpg",
            "DJI_0353.jpg",
            "_MK20319-Redigera.jpg",
            "_MK20314.jpg",
            "_MK20319-Redigera.jpg",
          ],
          history: [
            '28th February 2020',
            '4th February 2020',
            '12th October 2019'
          ],
          googlealbum: 'https://photos.app.goo.gl/2bWdem8ese9sp9PfA'
        },
        {
          coords: `58°09'47.4"N 15°40'10.8"E`,
          name: "Fulufjället",
          rating: 5,
          photos: [
            "_MK27217.jpg",
            "_MK27318-Redigera.jpg",
            "_MK27491.jpg",
            "_MK27566.jpg",
          ],
          history: [
            '28th February 2020',
            '4th February 2020',
            '12th October 2019'
          ],
          googlealbum: 'https://photos.app.goo.gl/2bWdem8ese9sp9PfA',
          paragrafs: [
            'Fulufjället bjuder på en fjällupplevelse utöver det vanliga. Här kan du se spår av Sveriges största djur och njuta av vidderna på längdskidor, snöskoter eller från en renfäll med en kopp varm choklad.',
            'Njupeskärs vattenfall är ett av de högsta i Sverige med sina 93 meter och har en fri fallhöjd på 70 meter. Under årtusenden har vattnet mejslat ut en stor klyfta. Hit kommer de flesta besökare. På toppen av fallet har du en fantastisk utsikt över klyftan och landskapet.'
          ]
        },
        {
          coords: `58°09'47.4"N 15°40'10.8"E`,
          name: "Viggeby",
          rating: 2.5,
          photos: [
            "DJI_0336.jpg",
            "DJI_0357.jpg",
            "DJI_0353.jpg",
            "_MK20319-Redigera.jpg",
            "_MK20314.jpg",
            "_MK20319-Redigera.jpg",
          ],
          history: [
            '28th February 2020',
            '4th February 2020',
            '12th October 2019'
          ],
        },
        {
          coords: `58°09'47.4"N 15°40'10.8"E`,
          name: "Ågelsjön",
          rating: 3,
          photos: [
            "_MK29302-2.jpg",
            "_MK29991.jpg",
            "_MK29999.jpg",
            "_MK29225.jpg",
            "_MK24882.jpg",
      ],
      youtube: [
            'https://www.youtube.com/embed/Z6Wlg3yt1u0'
          ],
          paragrafs: [
        'Ågelsjön är ett av de mest välbesökta naturreservaten i närheten av Norrköping. Här kan man vandra, paddla kanot, bada och klättra. Branterna längs Ågelsjön är välbekanta hos klättrare över hela landet. För den som vill fiska finns bland annat gädda, abborre och lake i sjön men glöm inte att köpa fiskekort.'
          ],
          history: [
            '28th February 2020',
            '4th February 2020',
            '12th October 2019'
          ],
        }
        
      ];
      console.log('locations set')
      commit('SET_LOCATIONS', locations);
    }
  },
  modules: {
  }
})
