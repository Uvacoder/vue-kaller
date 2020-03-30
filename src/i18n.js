import Vue from 'vue'
import VueI18n from 'vue-i18n'
import api from './services/api'
import axios from 'axios';

Vue.use(VueI18n)

//Standard function to load locales
function loadLocaleMessages () {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

const i18n = new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
})

export default i18n
if (localStorage.lang) {
      i18n.locale = localStorage.lang;
    }




const loadedLocales = {};

export const loadLocaleAsync = async (locale) => {
  let messages = loadedLocales[locale];
    const res = await axios.post(`https://kaller.test/api/locales/${locale}`);
    messages = res.data;
    console.log('FETCHING LOCALS',locale,messages)
    loadedLocales[locale] = messages;
    i18n.setLocaleMessage(locale, messages);
};

//Fetches locales from API
// loadLocaleAsync('sv');
// loadLocaleAsync('en');