<template>
  <v-expansion-panels :value="expand">
    <v-expansion-panel>
      <v-expansion-panel-header color="success">{{$t('prints.pricetable')}}</v-expansion-panel-header>
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
                <td>{{ alt.size }} cm</td>
                <td>{{ alt.price }} kr</td>
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
    prices: Array,
    expand: Number
  }
};
</script>

<style>
</style>