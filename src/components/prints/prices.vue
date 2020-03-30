<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header color="success">Sizes and prices</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Size</th>
                <th class="text-left">Dimensions</th>
                <th class="text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="alt in prices" :key="alt.name">
                <td>{{alt.name}}</td>
                <td>{{ alt.size }}</td>
                <td>{{ alt.price }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  props: {
    prices: Array
  }
};
</script>

<style>
</style>