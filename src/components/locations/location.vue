<template>
  <div class="ma-12 test">
    <h1>{{$route.params.location}}</h1>
  </div>
</template>

<script>
export default {
  name: "Location",
  created() {
    console.log("HELLO?????", this.$route.params.location);
  }
};
</script>

<style scoped>
</style>