import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css'
import { Touch } from 'vuetify/lib/directives'


Vue.use(Vuetify,{
    directives: {
        Touch
    }
});

export default new Vuetify({
    icons: {
        iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
    },
});
