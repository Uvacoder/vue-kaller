<template>
    <div class="body">
        <v-container>
            <v-row no-gutters>
                <v-col v-for="photo in photos" class="phototest">
                    <v-card
                            class="mx-auto px-2 pt-2"
                            :max-width="photo.width/2.7"
                    >
                        <v-img
                                :max-height="400"
                                contain
                                class="white--text align-end"
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
            }
        },
        methods: {
            async requestPhotos() {
                let photos = await api.loadPhotos({limit: 20 });
                console.log(photos);
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
        padding: 10px;
    }

    .body{
        background-color: #383838;
    }
</style>
