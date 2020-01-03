<template>
    <div>
        <v-carousel>
            <v-carousel-item
                    v-for="photo in photos"
                    :key="photo"
                    :src="photo"
            >
                <div class="header">
                    <v-spacer></v-spacer>
                    <div class="display-3">Kaller's Landscape Photography</div>
                    <v-spacer></v-spacer>
                </div>
            </v-carousel-item>
        </v-carousel>
    </div>
</template>

<script>
    import api from "../services/api.js";

    export default {
        name: "home",
        data () {
            return {
                photos: []
            }
        },
        methods: {
            async requestPhotos() {
                this.photos = await api.post({limit: ""},'homepagephotos');
            },
        },
        created() {
            this.requestPhotos();
        },
    }
</script>

<style scoped>
.header{
    color: white;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

    .wrapper{
        background-color: #383838;
        height: 90vh;
    }
</style>