<template>
        <div class="overlayPhoto" @keyup.right="nextOverlay()" @keyup.left="prevOverlay()">
            <div @click="prevOverlay()" class="button">
                <v-icon style="font-size: 70px;">mdi-arrow-left-circle-outline</v-icon>
            </div>
            <div @click="hideOverlay()" class="exit"></div>
            <div class="d-inline box" :style="'width: '+this.overlayProp.width+8+'px'">
                <v-img
                        :src="overlayProp.path"
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
            nextOverlay() {
                console.log('next');
                this.$emit('next')
            },
            prevOverlay() {
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