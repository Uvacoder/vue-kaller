<template>
  <div class="ma-12 test">
    <h1>{{$route.params.location}}</h1>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Location",
  computed: {
    ...mapState(["locations", "windowSize"])
  },
  created() {
    console.log("HELLO?????", this.$route.params.location);
  }
};
</script>

<style scoped>
</style>