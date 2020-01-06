<template>
    <v-card :class="{'mobilePhoto': $vuetify.breakpoint.smAndDown, 'pt-2 px-2 photocard': true, 'disabled': true}"
            @click="click(index,!$vuetify.breakpoint.smAndDown)" :ripple="!$vuetify.breakpoint.smAndDown">
        <v-img
                v-show="!$vuetify.breakpoint.smAndDown"
                :src="$host + photo.path"
                :class="{'desktopPhoto': $vuetify.breakpoint.xlOnly}"
                :lazy-src="$host + photo.prepath"
        >
            <template v-slot:placeholder>
                <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                >
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
            </template>
        </v-img>
        <v-img
                v-show="$vuetify.breakpoint.smAndDown"
                :src="$host + photo.mobilepath"
                :class="{'desktopPhoto': $vuetify.breakpoint.xlOnly}"
                :lazy-src="$host + photo.prepath"
        >
            <template v-slot:placeholder>
                <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                >
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
            </template>
        </v-img>

        <v-row>
            <v-col cols="7" md="12" class="pt-0">
                <v-card-subtitle class="pb-0">{{photo.lens}}</v-card-subtitle>
                <v-card-text class="text--primary pa-0 pl-4">
                    <div>{{photo.aperture}} and {{photo.shutterspeed}}s</div>
                    <div>{{photo.date_string}}</div>
                </v-card-text>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="5" md="0" class=" d-flex justify-center align-center" v-if="$vuetify.breakpoint.smAndDown">
                <navigator-share
                        v-bind:on-error="onError"
                        v-bind:on-success="onSuccess"
                        :url="'https://kallers.se/photography/' + photo.filename"
                        title="Kaller Creations"
                        text=""
                >
                <v-btn color="primary">
                    Share
                    <v-icon size="20">mdi-share-variant</v-icon>
                </v-btn>
                </navigator-share>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
    import NavigatorShare from 'vue-navigator-share'

    export default {
        name: "photoCard",
        props: {
            photo: Object,
            click: Function,
            index: Number
        },
        components: {
            NavigatorShare
        },
        methods: {
            onError(){
                alert("Please open this website in another browser, Chrome or Safari is recommended. This feature only works on mobile");
            }
        },
        computed: {
            url() {
                return window.location.href;
            }
        }
    }
</script>

<style scoped>
    .desktopPhoto {
        height: 400px !important;
    }

    .photocard {
        width: 100%;
    }

</style>