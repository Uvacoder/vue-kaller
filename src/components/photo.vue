<template>
    <div class="body">

        <v-overlay :value="overlay" opacity="0.9" >
            <overlay :photos="photos" :overlay-prop="overlayProp" :window-size="windowSize" @overlayevent="test" @next="nextOverlay()" @prev="prevOverlay"></overlay>
        </v-overlay>

        <v-container>

            <v-row no-gutters>
                <v-col v-for="(photo, index) in photos"
                       :class="'col-lg-'+photo.col+' col-md-'+photo.col*2+' col-sm-12 phototest'" v-bind:key="photo.id">
                    <v-card class="px-2 pt-2" @click="showOverlay(index)">
                        <v-img
                                :src="'http://kaller.test'+photo.path"
                        >
                        </v-img>

                        <v-card-subtitle class="pb-0">{{photo.lens}}</v-card-subtitle>

                        <v-card-text class="text--primary">
                            <div>{{photo.aperture}} and {{photo.shutterspeed}}s</div>
                            <div>{{photo.date_string}}</div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import api from '../services/getPhotos.js';
    import Overlay from './PhotoOverlay';

    export default {
        name: "style",
        data() {
            return {
                photos: [],
                height: 500,
                overlay: false,
                overlayProp: {
                    path: 'path',
                    width: '',
                    height: '',
                    index: 0
                },
                windowSize: {
                    x: 0,
                    y: 0,
                },
                menuItems: [
                    { title: 'Home', path: '/home', icon: 'home' },
                    { title: 'Sign Up', path: '/signup', icon: 'face' },
                    { title: 'Sign In', path: '/signin', icon: 'lock_open' }
                ],
                sidebar: false,
                appTitle: 'Awesome App',
            }
        },
        methods: {
            async requestPhotos() {
                let photos = await api.loadPhotos({limit: ''});
                console.log(photos[0].id);
                this.photos = photos;
            },
            showOverlay(index) {
                this.overlayProp.index = index;
                this.overlayProp.path = this.photos[index].path;
                this.overlayProp.height = this.photos[index].height;
                let width = this.photos[index].width / (this.photos[index].height / (this.windowSize.y * 0.9));
                if (width > this.windowSize.x * 0.9) {
                    console.log('mode 1');
                    this.overlayProp.height = 'auto';
                    this.overlayProp.width = this.windowSize.x * 0.9;
                } else {
                    console.log('mode 1');
                    this.overlayProp.width = width
                }
                this.overlay = true;
                this.$router.push('/photography/'+this.photos[index].filename);
            },
            onResize() {
                this.windowSize = {x: window.innerWidth, y: window.innerHeight}
            },
            test(value) {
                this.overlay = value;
                this.$router.push('/photography')
            },
            nextOverlay() {
                let index = this.overlayProp.index;
                this.showOverlay(index + 1);
                console.log('next');
            },
            prevOverlay() {
                let index = this.overlayProp.index;
                this.showOverlay(index - 1);
                console.log('prev');
            },
        },
        created() {
            this.requestPhotos()
        },
        mounted() {
            this.onResize()
        },
        components: {
            Overlay
        }
    }

</script>

<style scoped>
    .phototest {
        padding: 8px;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .test {
        background-color: red;
    }

    .body {
        background-color: #383838;
    }

    .vb > .vb-dragger {
        z-index: 5;
        width: 12px;
        right: 0;
    }

    .vb > .vb-dragger > .vb-dragger-styler {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transform: rotate3d(0,0,0,0);
        transform: rotate3d(0,0,0,0);
        -webkit-transition:
                background-color 100ms ease-out,
                margin 100ms ease-out,
                height 100ms ease-out;
        transition:
                background-color 100ms ease-out,
                margin 100ms ease-out,
                height 100ms ease-out;
        background-color: rgba(48, 121, 244,.1);
        margin: 5px 5px 5px 0;
        border-radius: 20px;
        height: calc(100% - 10px);
        display: block;
    }

    .vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
        background-color: rgba(48, 121, 244,.3);
    }

    .vb > .vb-dragger:hover > .vb-dragger-styler {
        background-color: rgba(48, 121, 244,.5);
        margin: 0px;
        height: 100%;
    }

    .vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
        background-color: rgba(48, 121, 244,.5);
        margin: 0px;
        height: 100%;
    }

    .vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
        background-color: rgba(48, 121, 244,.5);
    }
</style>
