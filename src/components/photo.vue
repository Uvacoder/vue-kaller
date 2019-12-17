<template>
    <div class="body">
        <v-overlay :value="overlay" opacity="0.9">
            <overlay
                    :photo="photo"
                    :overlay-prop="overlayProp"
                    :window-size="windowSize"
                    @close="test"
                    @next="nextOverlay"
                    @prev="prevOverlay"
            ></overlay>
        </v-overlay>

        <v-container>
                <v-row no-gutters>
                    <v-col
                            v-for="(photo, index) in photos"
                            :class="'col-lg-'+photo.col+' col-md-'+photo.col*2+' col-sm-12 phototest'"
                            v-bind:key="photo.id"
                    >

                        <photoCard :photo="photo" :click="showOverlay" :index="index"></photoCard>
                    </v-col>
                </v-row>

        </v-container>
    </div>
</template>

<script>
    import api from "../services/getPhotos.js";
    import Overlay from "./PhotoOverlay";
    import photoCard from "./photoCard";

    export default {
        name: "style",
        data() {
            return {
                photos: [],
                photo: null,
                overlay: false,
                overlayProp: {
                    path: "path",
                    width: "",
                    height: "",
                    index: 0
                },
                windowSize: {
                    x: 0,
                    y: 0
                }
            };
        },
        methods: {
            async requestPhotos() {
                this.photos = await api.loadPhotos({limit: ""});
            },
            showOverlay(index, active = true) {
                if (active) {
                    this.photo = this.photos[index];
                    this.overlayProp.index = index;
                    this.overlayProp.path = this.photos[index].path;
                    this.overlayProp.height = this.photos[index].height;
                    let width = this.photos[index].width / (this.photos[index].height / (this.windowSize.y * 0.9));
                    if (width > this.windowSize.x * 0.9) {
                        console.log("mode 1");
                        this.overlayProp.height = "auto";
                        this.overlayProp.width = this.windowSize.x * 0.9;
                    } else {
                        console.log("mode 1");
                        this.overlayProp.width = width;
                    }
                    this.overlay = true;
                    this.$router.push("/photography/" + this.photos[index].filename);
                }
            },
            onResize() {
                this.windowSize = {x: window.innerWidth, y: window.innerHeight};
            },
            test(value) {
                this.overlay = value;
                this.$router.push("/photography");
            },
            nextOverlay() {
                let index = this.overlayProp.index;
                this.showOverlay(index + 1);
            },
            prevOverlay() {
                let index = this.overlayProp.index;
                this.showOverlay(index - 1);
            }
        },
        created() {
            this.requestPhotos();
            console.log(this.$vuetify.breakpoint.sm);
        },
        mounted() {
            this.onResize();
        },
        components: {
            Overlay,
            photoCard
        }
    };
</script>

<style scoped>
    .phototest {
        padding: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .body {
        background-color: #383838;
    }

    .mobilePhoto {
        width: 1000px !important;
    }
</style>
