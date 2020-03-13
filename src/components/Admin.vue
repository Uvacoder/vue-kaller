<template>
  <div class="wrapper">
    <v-container>
      <div :class="{'wrap': $vuetify.breakpoint.mdAndDown, 'stats': true}">
        <div class="mt-2 col-lg-7 col-12">
          <v-btn
            class="mr-2"
            :loading="loading1"
            :disabled="loading1"
            color="primary"
            @click="db"
            x-large
            height="70px"
          >Refresh DB</v-btn>
          <v-btn
            :loading="loading2"
            :disabled="loading2"
            color="warning"
            @click="resize"
            x-large
            height="70px"
            class="mr-2"
          >Resize photos</v-btn>
          <v-btn
            :loading="loading3"
            :disabled="loading3"
            color="error"
            @click="reload"
            x-large
            height="70px"
            class="mr-2"
          >Reload photos and DB</v-btn>
          <v-btn
            :loading="loading4"
            :disabled="loading4"
            color="secondary"
            @click="restore"
            x-large
            height="70px"
            class="mr-2"
          >Restore from Backup</v-btn>
        </div>
        <h1 class="display-3 col-lg-5 col-12 text-md-right">{{amount}} Photos in Database</h1>
      </div>
      <div class="pa-2">
        <v-card dark class="statscard">
          <v-card-text class="display-2">Months photographed</v-card-text>
          <v-sparkline
            class="col-12"
            :value="value"
            :gradient="gradient"
            smooth="5"
            :padding="20"
            line-width="2"
            stroke-linecap="round"
            gradient-direction="top"
            type="trend"
            auto-draw
            :labels="labels"
            label-size="4"
            dark
          ></v-sparkline>
        </v-card>
      </div>
      <div :class="{'wrap': $vuetify.breakpoint.mdAndDown, 'stats': true}">
        <div class="pa-2 col-lg-6 col-12">
          <v-card dark>
            <v-card-text class="display-2">Lenses</v-card-text>
            <v-sparkline
              :value="lensValue"
              :gradient="gradient"
              :line-width="16"
              :fill="true"
              type="bar"
              auto-draw
              :labels="lensLabels"
              label-size="8"
              dark
            ></v-sparkline>
          </v-card>
        </div>
        <div class="pa-2 col-lg-6 col-12">
          <v-card dark height="100%" class="'pt-2 px-2">
            <v-card-text class="display-2">Add photo to Database</v-card-text>
            <v-form>
              <v-container>
                <v-row>
                  <v-col lg="9" cols="12">
                    <v-file-input @change="fileChange"></v-file-input>
                  </v-col>
                  <v-col lg="3" cols="12">
                    <v-btn
                      x-large
                      @click="photoUpload"
                      :loading="loading5"
                      :disabled="loading5"
                      color="primary"
                    >Upload photo</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card>
        </div>
      </div>
      <div class="pa-2">
        <v-card dark>
          <v-card-title>
            Database
            <v-spacer></v-spacer>
            <v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="photos"
            :search="search"
            :items-per-page="100"
            hide-default-footer
            show-expand
            single-expand
          >
            <template v-slot:expanded-item="{ item }">
              <div class="d-block d-md-flex">
                <div :class="{'expandedtext': $vuetify.breakpoint.mdAndUp, 'pa-2': true}">
                  <v-chip class="ma-2" color="primary">ID</v-chip>
                  {{item.id}}
                  <v-spacer></v-spacer>
                  <v-chip class="ma-2" color="primary">Date</v-chip>
                  {{item.date}}
                  <v-spacer></v-spacer>
                  <v-chip class="ma-2" color="primary">Pre path</v-chip>
                  {{item.prepath}}
                  <v-spacer></v-spacer>
                  <v-chip class="ma-2" color="primary">Low path</v-chip>
                  {{item.path}}
                  <v-spacer></v-spacer>
                  <v-chip class="ma-2" color="primary">2k path</v-chip>
                  {{item.highpath}}
                  <v-spacer></v-spacer>
                  <v-chip class="ma-2" color="primary">Path</v-chip>
                  /images/highres/{{item.filename}}
                  <v-spacer></v-spacer>
                  <v-btn color="warning" @click="photoResize(item.filename)">Resize</v-btn>
                  <v-btn color="success" @click="photoHide(item.filename)">Hide</v-btn>
                  <v-btn color="error" @click="photoDelete(item.filename)">Delete</v-btn>
                </div>
                <v-spacer></v-spacer>
                <div>
                  <img :src="$host + item.path" style="height: 200px" />
                </div>
              </div>
            </template>
            <template v-slot:item.photo="{ item }">
              <img :src="$host + item.prepath" style="height: 60px" />
            </template>
            <template v-slot:item.dim="{ item }">{{ item.width }} x {{item.height}}</template>
          </v-data-table>
        </v-card>
      </div>
      <v-snackbar v-model="snackbar" :color="snackcolor">
        {{ text }}
        <v-btn color="white" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
import api from "../services/api.js";
import { mapState } from "vuex";

const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"]
];

export default {
  name: "Admin.vue",
  computed: {
    ...mapState(["photos"])
  },
  methods: {
    db: async function() {
      this.loader = "loading1";
      console.log(this.$auth);
      this.text = await api.post(
        { mode: "db", auth: localStorage.auth },
        "reload"
      );
      this.snackbar = true;
      this.snackcolor = "success";
      console.log(this.text);
      this.loader = false;
      this.loading1 = false;
      this.loadStats();
    },
    resize: async function() {
      this.loader = "loading2";
      this.text = await api.post(
        { mode: "resize", auth: localStorage.auth },
        "reload"
      );
      this.snackbar = true;
      this.snackcolor = "success";
      console.log(this.text);
      this.loader = false;
      this.loading2 = false;
      this.loadStats();
    },
    reload: async function() {
      this.loader = "loading3";
      this.text = await api.post({ auth: localStorage.auth }, "reload");
      this.snackbar = true;
      this.snackcolor = "success";
      console.log(this.text);
      this.loader = false;
      this.loading3 = false;
      this.loadStats();
    },
    loadStats: function() {
      api.post(null, "graph").then(r => {
        console.log(r);
        for (let i = 0; i < r["month"].length; i++) {
          r["month"][i] = parseInt(r["month"][i]);
        }
        for (let i = 0; i < r["lens"].length; i++) {
          r["lens"][i] = parseInt(r["lens"][i]);
        }
        this.value = r["month"];
        this.amount = r["amount"];
        this.lensValue = r["lens"];
      });
      this.$store.dispatch("getPhotos");
    },
    fileChange: function(file) {
      console.log(file);
      this.file = file;
    },
    async photoUpload() {
      this.loader = "loading5";
      if (this.file) {
        const form = new FormData();
        form.append("fileToUpload", this.file);
        form.append("auth", localStorage.auth);
        const response = await api.upload(form, "uploadphoto");
        this.text = response;
        this.snackcolor = "success";
        this.snackbar = true;
        this.loadStats();
      } else {
        this.text = "No file was selected";
        this.snackcolor = "error";
        this.snackbar = true;
      }
      this.loader = false;
      this.loading5 = false;
    },
    async requestPhotos() {
      this.$store.dispatch("getPhotos");
    },
    async photoDelete(filename) {
      this.text = await api.post(
        { filename: filename, auth: localStorage.auth },
        "deletephoto"
      );
      this.snackcolor = "error";
      this.snackbar = true;
      this.loadStats();
      this.$store.dispatch("getPhotos");
    },
    async photoHide(filename) {
      this.text = await api.post(
        { filename: filename, mode: "hide", auth: localStorage.auth },
        "hidephoto"
      );
      this.snackcolor = "primary";
      this.snackbar = true;
      this.loadStats();
      this.$store.dispatch("getPhotos");
    },
    async photoResize(filename) {
      this.text = await api.post(
        { filename: filename, auth: localStorage.auth },
        "resizephoto"
      );
      this.snackcolor = "warning";
      this.snackbar = true;
      this.loadStats();
      this.$store.dispatch("getPhotos");
    },
    async restore() {
      this.loader = "loading4";
      this.text = await api.post({ auth: localStorage.auth }, "restore");
      this.loader = false;
      this.loading4 = false;
      this.snackcolor = "success";
      this.snackbar = true;
      this.loadStats();
      this.$store.dispatch("getPhotos");
    }
  },
  data() {
    return {
      amount: 100,
      lensValue: [1, 1, 1],
      text: "hello world",
      snackbar: false,
      loader: null,
      loading1: false,
      loading2: false,
      loading3: false,
      loading4: false,
      loading5: false,
      file: "",
      snackcolor: "success",
      headers: [
        { text: "Photo", value: "photo" },
        { text: "Filename", value: "filename" },
        { text: "Date", value: "date_string", align: "center" },
        { text: "Lens shoot with", value: "lens", align: "center" },
        { text: "width x height", value: "dim", align: "center" },
        { text: "Month", value: "month", align: "center" }
      ],
      search: "",

      gradient: gradients[5],
      value: [],
      gradients,
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      lensLabels: [
        "DJI Phantom 3",
        "Canon EF 70-200 f4L",
        "Sony FE 16-35 F4",
        "Minolta 45 F2"
      ]
    };
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      this.loader = null;
    }
  },
  created() {
    this.loadStats();
    console.log("hej");
  }
};
</script>

<style scoped>
.wrap {
  flex-wrap: wrap;
}

.expanded {
  justify-content: space-between;
  width: 100%;
}

.expandedtext {
  width: 500px;
}

.wrapper {
  background-color: #383838;
}

.display-3 {
  color: white;
  padding-top: 30px;
}

.height {
  height: 100%;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

.stats {
  display: flex;
  justify-content: space-between;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>