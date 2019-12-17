<template>
    <v-card :class="{'mobilePhoto': $vuetify.breakpoint.smAndDown, 'pt-2 px-2': true, 'disabled': true}" @click="click(index,!$vuetify.breakpoint.smAndDown)" :ripple="!$vuetify.breakpoint.smAndDown">
        <v-img :src="$host + photo.path" :class="{'desktopPhoto': !$vuetify.breakpoint.smAndDown}" lazy-src="https://via.placeholder.com/267x400">
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
        <v-card-subtitle class="pb-0">{{photo.lens}}</v-card-subtitle>

        <v-card-text class="text--primary">
            <div>{{photo.aperture}} and {{photo.shutterspeed}}s</div>
            <div>{{photo.date_string}}</div>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "photoCard",
        props: {
            photo: Object,
            click: Function,
            index: Number
        }
    }
</script>

<style scoped>
    .desktopPhoto{
        max-height: 330px !important;
    }

</style>