<template>
    <div class="body">
        <v-overlay :value="overlay" opacity="0.9">
            <overlay
                    :overlay-prop="overlayProp"
                    :window-size="windowSize"
                    @close="closeOverlay"
                    @next="nextOverlay"
                    @prev="prevOverlay"
            ></overlay>
        </v-overlay>
        <v-container>
            <v-fade-transition>
                <v-row no-gutters v-show="show">
                    <v-col
                            v-for="(photo, index) in photos"
                            :class="'col-xl-'+photo.col+' col-md-4'+' col-sm-12 phototest '"
                            :id="photo.filename"
                            v-bind:key="photo.id"
                    >

                        <photoCard :photo="photo" :click="showOverlay" :index="index"></photoCard>
                    </v-col>
                </v-row>
            </v-fade-transition>
        </v-container>
    </div>
</template>

<script>
    import Overlay from "./PhotoOverlay";
    import photoCard from "./photoCard";
    import  {mapState} from 'vuex'

    export default {
        name: "style",
        data() {
            return {
                show: false,
                overlay: false,
                overlayProp: {
                    path: "path",
                    width: "",
                    height: "",
                    index: 0
                },
            };
        },
        computed: {
            ...mapState([
                'photos',
                'windowSize'
            ])
        },
        props: {
            photo: String,
        },
        methods: {
            showOverlay(index, active = true, router=true) {
                if (active) {
                    this.overlayProp.photo = this.photos[index];
                    this.overlayProp.index = index;
                    this.overlayProp.path = this.photos[index].path;
                    this.overlayProp.height = this.photos[index].height;
                    let width = this.photos[index].width / (this.photos[index].height / (this.windowSize.y * 0.9));
                    if (width > this.windowSize.x * 0.9) {
                        console.log("mode 1");
                        this.overlayProp.height = 'auto';
                        this.overlayProp.width = this.windowSize.x * 0.9;
                    } else {
                        console.log("mode 2");
                        this.overlayProp.width = width;
                        this.overlayProp.height = this.windowSize.y * 0.9;
                    }
                    this.overlay = true;
                    if(router) this.$router.push("/photography/" + this.photos[index].filename);
                }
            },
            onResize() {
                if(this.overlay) this.showOverlay(this.overlayProp.index);
                this.$store.dispatch('getWindowSize');
            },
            closeOverlay(value) {
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
            },
            photoSelected(){
                const photos = this.photos;
                if(this.photo){
                    for (let i = 0; i < photos.length; i++) {
                        if(photos[i].filename===this.photo){
                            console.log('true');
                            this.showOverlay(i,true,false);
                            continue;
                        }
                    }
                }
            }
        },
        created() {
            console.log(this.$vuetify.breakpoint.sm);
            setTimeout(() => this.show=true, 1);
            window.addEventListener('resize', this.onResize);
        },
        mounted() {
            this.onResize();
            this.show = true;
        },
        watch: {
          photos: {
              handler: function (val, oldVal) {
                  console.log('photos changed');
                 this.photoSelected();
              }
          }
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
        min-height: 200vh;
    }

    .mobilePhoto {
        width: 1000px !important;
    }
</style>
