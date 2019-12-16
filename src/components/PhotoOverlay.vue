<template>
        <div class="overlayPhoto" @keyup.right="nextOverlay()" @keyup.left="prevOverlay()">
            <div @click="prevOverlay()" class="button">
                <v-icon style="font-size: 70px;">mdi-arrow-left-circle-outline</v-icon>
            </div>
            <div @click="hideOverlay()" class="exit"></div>
            <div class="d-inline box" :style="'width: '+this.overlayProp.width+8+'px'">
                <v-img
                        :src="'http://kaller.test'+overlayProp.path"
                        :height="windowSize.y*0.9"
                        @click="hideOverlay()"
                >
                </v-img>
            </div>
            <div @click="hideOverlay()" class="exit"></div>
            <div @click="nextOverlay()" class="button">
                <v-icon style="font-size: 70px;">mdi-arrow-right-circle-outline</v-icon>
            </div>
        </div>
</template>

<script>
    export default {
        name: "PhotoOverlay.vue",
        props: {
            photos: Array,
            windowSize: Object,
            overlayProp: Object
        },
        methods: {
            showOverlay(index) {
                this.overlayProp.index = index;
                this.overlayProp.path = this.photos[index].path;
                this.overlayProp.height = this.photos[index].height;
                let width = this.photos[index].width / (this.photos[index].height / (this.windowSize.y * 0.9));
                if ((this.overlayProp.width / (this.overlayProp.height / (this.windowSize.y * 0.9))) > this.windowSize.x * 0.9) {
                    this.overlayProp.width = 'auto';
                    this.overlayProp.width = this.windowSize.x * 0.9;
                } else {
                    this.overlayProp.width = width
                }
                this.overlay = true;
                console.log('show');
                this.$router.push('/photography/'+this.photos[index].filename);
            },
            nextOverlay() {
                // let index = this.overlayProp.index;
                // this.showOverlay(index + 1);
                console.log('next');
                this.$emit('next')
            },
            prevOverlay() {
                // let index = this.overlayProp.index;
                // this.showOverlay(index - 1);
                console.log('prev');
                this.$emit('prev')
            },
            hideOverlay(){
                this.$emit('overlayevent',false)
            }
        },
    }
</script>

<style scoped>
    .overlayPhoto {
        height: 95vh;
        width: 99vw;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .overlayPhoto .button {
        flex-grow: 5;
        height: 600px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .overlayPhoto .box {
        background-color: white;
        padding: 4px;
    }

    .exit{
        flex-grow: 1;
        height: 100%;
    }

</style>