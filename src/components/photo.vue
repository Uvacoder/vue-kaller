<template>
    <div class="body">
        <v-container>

            <v-row no-gutters>
                <v-col v-for="photo in photos" :class="photo.col+' phototest'">
                    <v-card class="px-2 pt-2">
                        <v-img
                                contain
                                :src="'http://kaller.test'+photo.path"
                        >
                        </v-img>

                        <v-card-subtitle class="pb-0">{{photo.filename}}</v-card-subtitle>

                        <v-card-text class="text--primary">
                            <div>{{photo.aperture}}</div>
                            <div>{{photo.shutterspeed}}s</div>
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
                height: 500
            }
        },
        methods: {
            async requestPhotos() {
                let photos = await api.loadPhotos({limit: 100 });
                console.log(photos);
                let photo = photos[0];
                console.log(photo.width/(photo.height/400));
                this.photos = photos;
            },
        },
        created() {
            this.requestPhotos()
        }
    }
</script>

<style scoped>
    .phototest{
        padding: 8px;
    }

    .body{
        background-color: #383838;
    }
</style>
