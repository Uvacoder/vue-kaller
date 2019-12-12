<template>
    <div class="body">
        <div class="text-center">
            <v-btn
                    color="error"
                    @click="overlay = !overlay"
            >
                Show Overlay
            </v-btn>

            <v-overlay :value="overlay">
                <v-img
                        :src="'http://kaller.test'+overlayProp.path"
                        height="90vh"
                        contain
                        @click="overlay = false"
                        class="px-3 pt-3"
                >
                </v-img>
                <v-btn
                        icon
                        @click="overlay = false"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-overlay>
        </div>
        <v-container>

            <v-row no-gutters>
                <v-col v-for="photo in photos" :class="photo.col+' phototest'">

                    <v-card class="px-2 pt-2" max-height="500" @click="showOverlay(photo)">
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

    export default {
        name: "style",
        data() {
            return {
                photos: null,
                height: 500,
                overlay: false,
                overlayProp: {
                    path: 'path',
                    width: '',
                    height: ''
                },
            }
        },
        methods: {
            async requestPhotos() {
                let photos = await api.loadPhotos({limit: 100 });
                console.log(photos);
                let photo = photos[0];
                this.photos = photos;
            },
            showOverlay(photo){
                this.overlayProp.path=photo.path;
                this.overlayProp.width=photo.width;
                this.overlayProp.height=photo.height;
                this.overlay=true;
            }
        },
        created() {
            this.requestPhotos()
        }
    }
</script>

<style scoped>
    .phototest{
        padding: 8px;
        height: 515px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .body{
        background-color: #383838;
    }
</style>
