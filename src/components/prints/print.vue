<template>
  <v-container class="mt-6">
    <v-row>
      <v-col cols="12" lg="8">
        <v-card class="mb-4" light v-if="$vuetify.breakpoint.mdAndDown">
          <pricetable :prices="prices"></pricetable>
        </v-card>
        <v-stepper v-model="e1" light>
          <v-stepper-header>
            <v-stepper-step
              :complete="e1 > 1"
              step="1"
              editable
              edit-icon="mdi-check"
            >{{ $t('prints.steps[0]') }}</v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step
              :complete="e1 > 2"
              step="2"
              editable
              edit-icon="mdi-check"
            >{{ $t('prints.steps[1]') }}</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="e1 > 3"
              step="3"
              edit-icon="mdi-check"
            >{{ $t('prints.steps[2]') }}</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="4" editable edit-icon="mdi-check">{{ $t('prints.steps[3]') }}</v-stepper-step>
          </v-stepper-header>
          <v-btn
            block
            color="primary"
            @click="continueToCart()"
            v-show="e1==2"
            v-if="$vuetify.breakpoint.mdAndDown"
            :disabled="total === 0"
          >Choose sizes and frames</v-btn>
          <v-btn
            block
            color="primary"
            @click="e1=2"
            v-show="e1==1"
            v-if="$vuetify.breakpoint.mdAndDown"
          >Välj bilder</v-btn>
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-row>
                <v-col>
                  <p class="display-1">{{ $t('prints.title')}}</p>
                  <p class="body-1">{{ $t('prints.body')}}</p>
                  <v-alert
                    v-for="warning in $t('prints.warnings')"
                    v-bind:key="warning.text"
                    dense
                    text
                    :type="warning.status"
                  >{{ warning.text }}</v-alert>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="d-flex flex-column" cols="12" md="4">
                  <v-icon size="60" color="red">mdi-image</v-icon>
                  <p class="text-center headline text-center ma-0">{{ $t('prints.howto[0].title')}}</p>
                  <p class="body-1 ma-0 pl-1">{{ $t('prints.howto[0].body')}}</p>
                </v-col>
                <v-col class="d-flex flex-column" cols="12" md="4">
                  <v-icon size="60" color="success">mdi-aspect-ratio</v-icon>
                  <p class="headline text-center ma-0">{{ $t('prints.howto[1].title')}}</p>
                  <p class="body-1 ma-0 pl-1">{{ $t('prints.howto[1].body')}}</p>
                </v-col>
                <v-col class="d-flex flex-column" cols="12" md="4">
                  <v-icon size="60" color="primary">mdi-account</v-icon>
                  <p class="headline ma-0 text-center">{{ $t('prints.howto[2].title')}}</p>
                  <p class="body-1 ma-0 pl-1">{{ $t('prints.howto[2].body')}}</p>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="4" class="pa-0">
                  <v-img src="https://kallers.se/images/assets/print1.jpg" />
                </v-col>
                <v-col cols="12" md="4" class="pa-0">
                  <v-img src="https://kallers.se/images/assets/print2.jpg" />
                </v-col>
                <v-col cols="12" md="4" class="pa-0">
                  <v-img src="https://kallers.se/images/assets/print3.jpg" />
                </v-col>
              </v-row>
              <v-btn color="primary" @click="e1 = 2">{{$t('continue')}}</v-btn>

              <v-btn text @click="e1=1">{{$t('cancel')}}</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2" class="pa-2">
              <v-item-group multiple :value="value" class="grey darken-3 px-2 mb-2">
                <v-row>
                  <v-col
                    v-for="photo in photos"
                    :key="photo.id"
                    cols="4"
                    md="3"
                    lg="2"
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
                          :src="$host+photo.low_path"
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

              <v-btn color="primary" @click="e1 = 3">{{$t('continue')}}</v-btn>

              <v-btn text @click="e1=1">{{$t('cancel')}}</v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
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
                            :src="$host+item.photo.low_path"
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
              <v-btn color="primary" @click="e1 = 4">{{$t('continue')}}</v-btn>

              <v-btn text @click="e1=1">{{$t('cancel')}}</v-btn>
            </v-stepper-content>

            <v-stepper-content step="4">
              <v-card flat>
                <!-- <v-card-title>
                  <span class="headline">Request</span>
                </v-card-title>-->
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="Namn"
                        autocomplete="name"
                        required
                        v-model="orderinfo.name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Address"
                        required
                        v-model="orderinfo.address"
                        autocomplete="shipping street-address"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Postnummer"
                        hint="example of helper text only on focus"
                        autocomplete="shipping postal-code"
                        v-model="orderinfo.zip"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Stad"
                        required
                        v-model="orderinfo.city"
                        autocomplete="shipping locality"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Phone number*"
                        required
                        v-model="orderinfo.phone"
                        autocomplete="tel"
                      >></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Email*"
                        required
                        v-model="orderinfo.email"
                        autocomplete="email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Kommentar"
                        hint="Ifall du vill lägga till något"
                        persistent-hint
                        required
                        v-model="orderinfo.comment"
                      ></v-text-field>
                      <br />
                      <v-alert
                        dense
                        text
                        type="warning"
                      >Frakt kan tillkomma ifall du är utanför Linköping</v-alert>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <v-btn color="primary" block @click="makeOrder">{{$t('continue')}}</v-btn>
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
          <pricetable :expand="0" :prices="prices"></pricetable>
        </v-card>
        <v-card light v-if="!$vuetify.breakpoint.mdAndDown">
          <p class="display-3 ma-3">{{ $t('prints.cart') }}</p>
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
                      :src="$host+item.photo.low_path"
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
          <v-btn block color="primary" @click="continueToCart()">{{ $t('prints.continue[0]') }}</v-btn>
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
                    :src="$host+item.photo.low_path"
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

    <v-dialog v-model="orderdialog" max-width="600px">
      <v-card class="pa-3">
        <p>Kopiera in detta i ett mail till fotograf@kallers.se</p>
        <v-textarea :value="order" auto-grow filled readonly></v-textarea>
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
    shoppingDialog: false,
    e1: 1,
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
    total: 0,
    orderdialog: false,
    order: "Hello this is order",
    orderinfo: {
      name: "",
      address: "",
      zip: "",
      city: "",
      email: "",
      comment: "",
      phone: ""
    }
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
      this.e1 = 3;
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
    },
    makeOrder() {
      this.order = `Kontakt
      ${this.orderinfo.name}
      ${this.orderinfo.address}, ${this.orderinfo.zip}, ${this.orderinfo.city}
      ${this.orderinfo.phone}
      ${this.orderinfo.email}
      ${this.orderinfo.comment}

Bilder`;
      this.shoppingcart.forEach(item => {
        this.order += `
      ${item.photo.filename} - ${item.value}`;
      });
      this.order += `
      
Totalt: ${this.total} kr
      `;

      this.orderdialog = true;
    }
  },
  mounted() {
    this.prices.map(object => {
      this.pricelist.push(object.name + ", " + object.price + " kr");
    });
    this.pricelist.push("Annan storlek");
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
</style>