<template>
    <div class="body">
        <v-container>
            <div class="d-flex flex-wrap justify-lg-center">
                <div v-for="photo in photos" class="phototest">
                    <v-card class="px-2 pt-2" :width="photo.width/(photo.height/height)">
                        <v-img
                                :height="height"
                                :src="'http://kaller.test'+photo.path"
                        >
                        </v-img>

                        <v-card-subtitle class="pb-0">{{photo.filename}}</v-card-subtitle>

                        <v-card-text class="text--primary">
                            <div>{{photo.aperture}}</div>
                            <div>{{photo.shutterspeed}}s</div>
                        </v-card-text>
                    </v-card>
                </div>
            </div>
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
                height: 470
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
