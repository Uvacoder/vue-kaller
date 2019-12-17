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
                    <div class="display-3">Kaller's Lanscape Photography</div>
                    <v-spacer></v-spacer>
                </div>
            </v-carousel-item>
        </v-carousel>
    </div>
</template>

<script>
    export default {
        name: "home",
        data () {
            return {
                photos: [
                    'https://kallers.se/images/_MK27964-Pano.jpg',
                    'https://kallers.se/images/_MK29338-Pano.jpg',
                    'https://kallers.se/images/_MK28956-Pano-2.jpg',
                    'https://kallers.se/images/_MK27551-Pano.jpg',
                ]
            }
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