<template>
  <v-container class="mt-6 full">
    <v-row>
      <v-col cols="12" lg="8">
        <v-card class="mb-4" light v-if="$vuetify.breakpoint.mdAndDown">
          <pricetable :prices="prices"></pricetable>
        </v-card>
        <v-stepper v-model="e1" light>
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1" editable>Choose images</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2" editable>Choose sizes</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3" editable>Fill in your information</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content step="1" class="grey darken-3">
              <v-item-group multiple :value="value">
                <v-row>
                  <v-col
                    v-for="photo in photos"
                    :key="photo.id"
                    cols="3"
                    md="2"
                    v-if="photo.width/photo.height < 1"
                  >
                    <v-item v-slot:default="{ active }" :value="photo">
                      <v-card
                        @click="select(photo)"
                        :raised="active"
                        :class="active ? 'padding' : ''"
                        light
                      >
                        <v-img
                          :src="'https://kallers.se/'+photo.path"
                          class="text-right pa-0"
                          :gradient="active ? 'to top right, rgba(255,255,255,0), rgba(255,255,255,0), rgba(255,255,255,0), rgba(0,0,0,.8)' : 'to top right, rgba(255,255,255,.0), rgba(255,255,255,.0)'"
                          :aspect-ratio="210/297"
                        >
                          <v-btn icon dark x-large class="ma-0">
                            <v-icon>{{ active ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline' }}</v-icon>
                          </v-btn>
                        </v-img>
                      </v-card>
                    </v-item>
                  </v-col>
                </v-row>
              </v-item-group>

              <v-btn color="primary" @click="e1 = 2">Continue</v-btn>

              <v-btn text @click="e1=1">Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card light>
                <v-simple-table class="my-2">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Photo</th>
                        <th class="text-left">Alternativ</th>
                        <th class="text-left">Pris</th>
                        <th class="text-left"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in shoppingcart" :key="item.photo.id">
                        <td>
                          <v-img
                            :src="'https://kallers.se/'+item.photo.path"
                            :aspect-ratio="210/297"
                            max-width="50"
                          ></v-img>
                        </td>
                        <td>
                          <v-select :items="pricelist" hide-details v-model="item.value"></v-select>
                        </td>
                        <td>{{item.price}} kr</td>
                        <td>
                          <v-btn icon @click="removeFromCart(item.photo.filename)">
                            <v-icon>mdi-close</v-icon>
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
              <p class="display-1 text-right">Total: {{total}} kr</p>
              <v-btn color="primary" @click="e1 = 3">Continue</v-btn>

              <v-btn text @click="e1=1">Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

              <v-btn color="primary" @click="e1 = 1">Continue</v-btn>

              <v-btn text @click="e1=2">Cancel</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>

      <!-- <v-col cols="12" lg="8">
        <v-card class="mb-4" light v-if="$vuetify.breakpoint.mdAndDown">
          <pricetable :prices="prices"></pricetable>
        </v-card>
      </v-col>-->
      <v-col>
        <v-card class="mb-4" light v-if="!$vuetify.breakpoint.mdAndDown">
          <pricetable :prices="prices"></pricetable>
        </v-card>
        <v-card light v-if="!$vuetify.breakpoint.mdAndDown">
          <p class="display-3">Kundvagn</p>
          <v-simple-table class="my-2">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Photo</th>
                  <th class="text-left">Size</th>
                  <th class="text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in shoppingcart" :key="item.photo.id">
                  <td>
                    <v-img
                      :src="'https://kallers.se/'+item.photo.path"
                      :aspect-ratio="210/297"
                      max-width="50"
                    ></v-img>
                  </td>
                  <!-- <td>{{ item.photo.filename }}</td> -->
                  <td>{{ item.value }}</td>
                  <td>{{ item.price }} kr</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-btn block color="primary" @click="continueToCart()">Choose sizes and frames</v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-btn fixed dark fab bottom right color="primary" @click="shoppingDialog = true">
      <v-icon>mdi-cart</v-icon>
    </v-btn>
    <v-dialog v-model="shoppingDialog">
      <v-card class="mb-4" light>
        <pricetable :prices="prices"></pricetable>
      </v-card>
      <v-card light>
        <p class="display-3">Kundvagn</p>
        <v-simple-table class="my-2">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Photo</th>
                <th class="text-left">Size</th>
                <th class="text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in shoppingcart" :key="item.photo.id">
                <td>
                  <v-img
                    :src="'https://kallers.se/'+item.photo.path"
                    :aspect-ratio="210/297"
                    max-width="50"
                  ></v-img>
                </td>
                <!-- <td>{{ item.photo.filename }}</td> -->
                <td>{{ item.value }}</td>
                <td>{{ item.price }} kr</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-btn block color="primary" @click="continueToCart()">Choose sizes and frames</v-btn>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import pricetable from "./prices";
import "../../services/findKey";

export default {
  components: {
    pricetable
  },
  data: () => ({
    types: ["cards", "images"],
    type: "cards",
    mandatory: false,
    shoppingDialog: false,
    multiple: true,
    gradient: true,
    e1: "",
    value: [],
    prices: [
      {
        name: "A4 utan ram",
        size: "20x30",
        price: 150
      },
      {
        name: "A4 med ram",
        size: "30x40",
        price: 200
      },
      {
        name: "A3 utan ram",
        size: "30x45",
        price: 300
      },
      {
        name: "A3 med ram",
        size: "40x50",
        price: 300
      },
      {
        name: "Medel bild med ram",
        size: "60x70",
        price: 600
      },
      {
        name: "Stor bild med ram",
        size: "60x90",
        price: 900
      }
    ],
    pricelist: [],
    shoppingcart: [],
    total: 0
  }),
  computed: {
    ...mapState(["photos", "windowSize"])
  },
  methods: {
    test() {
      console.log(this.value);
    },
    select(filename) {
      if (this.value.includes(filename)) {
        this.deSelect(filename);
      } else {
        this.value.push(filename);
        this.createCart();
      }
    },
    deSelect(filename) {
      this.value.splice(this.value.indexOf(filename), 1);
      this.createCart();
    },
    createCart() {
      this.shoppingcart = [];
      this.value.forEach(photo => {
        let item = {
          photo,
          value: "A3 med ram, 300 kr",
          price: "300"
        };
        this.shoppingcart.push(item);
      });
      this.calculateCart();
    },
    continueToCart() {
      this.e1 = 2;
      this.createCart();
      this.shoppingDialog = false;
    },
    removeFromCart(filename) {
      this.shoppingcart.forEach((r, index) => {
        if (r.photo.filename === filename) {
          this.shoppingcart.splice(index, 1);
        }
      });
      this.calculateCart();
    },
    calculateCart() {
      this.total = 0;
      this.shoppingcart.forEach(item => {
        this.total += Math.floor(item.price);
      });
    }
  },
  mounted() {
    this.prices.map(object => {
      this.pricelist.push(object.name + ", " + object.price + " kr");
    });
  },
  watch: {
    shoppingcart: {
      handler: function(val, oldVal) {
        val.forEach((item, index) => {
          console.log(item);
          this.prices.forEach(r => {
            if (item.value.includes(r.name)) {
              this.shoppingcart[index].price = r.price;
            }
          });
        });
        this.calculateCart();
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.padding {
  padding: 2px;
}

.full {
  min-height: 100vh;
}
</style>