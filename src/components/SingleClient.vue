<template>
  <div class="client" :class="{ full: client.completed }" style="width: 100%">
    <div class="actions">
      <h4 @click="showDetails = !showDetails" class="col-3">
        {{ client.title }} {{ client.nom }}
      </h4>
      <h4
        :class="{
          'delay col-2b': startTime <= 0,
          'delay col-2c': startTime > 0
        }"
        @click="showDetails = !showDetails"
      >
        <span class="material-icons delay">alarm</span> {{ startTime }}
        {{ "jour" | pluralize(startTime) }}
      </h4>

      <div id="chart" class="chart1">
        <apexchart
          type="radialBar"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>

      <div class="icons col-2">
        <router-link
          :to="{ name: 'EditClient', params: { client_slug: client.slug } }"
        >
          <span class="material-icons">edit</span>
        </router-link>

        <span class="material-icons" @click.prevent="deleteClient(client.id)">
          delete
        </span>

        <label>
          <span></span>
          <input
            type="checkbox"
            class="label__checkbox"
            v-model="client.completed"
            :checked="client.completed"
            @change="updateStatus(client.id, $event)"
          />
        </label>
      </div>
    </div>
    <div v-if="showDetails" class="details">
      <div
        class="row row-cols-4"
        :class="{ completed: article.isChecked }"
        v-for="(article, index, key) in client.articles"
        :key="key"
      >
        <div class="col-1 qty2">{{ article.qty }} x</div>
        <div class="col-3">
          {{ article.article }}
        </div>
        <div class="col-3">
          {{ article.taille }}
        </div>
        <div class="col-3">
          <span class="material-icons info">person</span>{{ article.name }}
        </div>
        <div class="col-1 qty">
          <label>
            <span :class="{ completed: article.isChecked }"> Fait </span>
            <input
              type="checkbox"
              class="filled-in"
              v-model="article.isChecked"
              :checked="article.isChecked"
              @change="updateArticle(article.id, $event)"
            />
          </label>
        </div>
      </div>
    </div>
    <div class="actions_info">
      <a>
        <span class="material-icons info">home</span>{{ client.adresse }}
        {{ client.ville }} {{ client.cp }}
      </a>
      <a>
        <span class="material-icons info">call</span> {{ client.fixe }} &ensp;
        <span class="material-icons info">stay_current_portrait</span
        >{{ client.portable }} &ensp;
        <span class="material-icons info">mail_outline</span>&nbsp;{{
          client.email
        }}
      </a>
    </div>
    <div class="actions_date">
      <a>
        <span class="material-icons info">calendar_today</span
        >{{ client.timestamp | date }}
      </a>
      <a class="todo-count">
        <strong>Reste à faire {{ remaining2 }} / {{ remaining }} </strong>
      </a>
      <a>
        <span class="material-icons info">local_shipping</span>
        {{ client.dateliv.toDate() | date }}
      </a>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import moment from "moment";
import VueApexCharts from "vue-apexcharts";

let filters = {
  active: function(articles) {
    return articles.filter(article => !article.isChecked);
  }
};

export default {
  props: ["client"],
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      series: [
        (
          (([filters.active(this.client.articles).length] /
            [this.client.articles.length]) *
            100 -
            100) *
          -1
        ).toFixed(0)
      ],
      chartOptions: {
        chart: {
          type: "radialBar",
          offsetY: -13,
          sparkline: {
            enabled: true
          }
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: "#e7e7e7",
              strokeWidth: "97%",
              margin: 5 // margin is in pixels
            },
            dataLabels: {
              name: {
                show: false
              },
              value: {
                offsetY: 0,
                fontSize: "20px"
              }
            }
          }
        },
        grid: {
          padding: {
            top: 0
          }
        },
        fill: {
          colors: ["#3f8dc5"]
        },
        labels: ["Average Results"]
      },

      a: moment(new Date()),
      b: moment(this.client.dateliv.toDate()),

      clients: [],
      loading: false,
      showDetails: false,
      articles: [],
      article: { isChecked: "" },
      completed: false
    };
  },

  computed: {
    remaining() {
      return this.client.articles.length;
    },

    remaining2: function() {
      return filters.active(this.client.articles).length;
    },

    startTime() {
      return this.b.diff(this.a, "days");
    }
  },

  methods: {
    deleteClient(id) {
      if (confirm("Êtes-vous sur de vouloir supprimer ce client ?")) {
        //effacer de firestore
        db.collection("clients")
          .doc(id)
          .delete()
          .then(() => {
            this.clients = this.clients.filter(client => {
              return client.id != id;
            });
          });
      }
    },

    updateArticle(docId, e) {
      var isChecked = e.target.checked;
      db.collection("clients")
        .doc(this.client.id)
        .collection("articles")
        .doc(docId)
        .update({
          isChecked: isChecked
        });
    },

    updateStatus(Id, e) {
      var completed = e.target.checked;
      db.collection("clients")
        .doc(this.client.id)

        .update({
          completed: completed
        });
    },
    mark(i) {
      db.collection("clients")
        .doc(id)
        .update({
          articles: db.FieldValue.arrayUnion("value1", "value2")
        })
        .then(() => {
          this.clients = this.clients.filter(client => {
            return client.id != id;
          });
        });
    }
  },

  created2() {
    let ref = db.collection("clients");
    ref.onSnapshot(snapshot => {});
  },

  created() {
    //récuperer data de firestore

    db.collection("clients")

      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let client = doc.data();
          client.id = doc.id;

          // start with sub-collections
          db.collection("clients")
            .doc(doc.id)
            .collection("articles")
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                // get sub-collection data
                let article = doc.data();

                // get sub-collection id
                article.id = doc.id;

                if (client.articles) {
                  client.articles.push(article);
                } else {
                  // this the first item, that means there is no article item
                  client.articles = [{ ...article }];
                }
                console.warn(this.clients);
              });
              // after all this push all data into clients
              this.clients.push(client);
            });
        });

        this.loading = false;
      });
  }
};
</script>

<style>
input.label__checkbox {
  height: 23px;
  width: 18px;
  margin-left: 14px;
  cursor: pointer;
}
.material-icons:hover {
  color: #a7a7a7 !important;
}

.client.full {
  background: #e8ffed;
}

.full {
  border-left: 8px solid #81c24d !important;
}
h4.delay.col-2b {
  background-color: red;
}
h4.delay.col-2c {
  background-color: #72c7e7;
}
.client {
  margin: 16px auto;
  background: white;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 1px 2px 3px rgb(0, 0, 0, 0.2);
  border-left: 8px solid #aa5656;
  margin-left: 0px;
  margin-right: 20px;
}
h4 {
  cursor: pointer;
  text-transform: uppercase;
  margin-bottom: 0rem;
  font-size: 20px;
  font-weight: 600;
}

div#chart {
  font-size: 17px !important;
  max-width: 150px;
}
.col-1.qty {
  min-width: 52px !important;
  padding-left: 0px !important;
  padding-right: 0px !important;
  text-align: right;
}

.col-1.qty2 {
  min-width: 52px !important;
  padding-left: 15px !important;
  padding-right: 0px !important;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 7px;
}
.actions_info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #80808024;
  margin-left: -20px;
  margin-right: -20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 5px;
  padding-top: 5px;
  margin-bottom: -10px;
}
.actions_date {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #a3d1ff54;
  margin-left: -20px;
  margin-right: -20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 5px;
  padding-top: 5px;
  margin-top: 9px;
  margin-bottom: -10px;
  font-weight: bold;
}
.material-icons {
  font-size: 24px;
  margin-left: 10px;
  color: #3f8dc5;
  cursor: pointer;
}

.material-icons:hover {
  color: #aa5656;
}

.details {
  padding-top: 10px;
  background: #d3d3d324;
  margin-left: -20px;
  margin-right: -20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 0px;
  padding-top: 5px;
}

.completed {
  text-decoration: line-through;
  color: grey;
  background-color: #bfdebf;
  margin-top: 1px;
  border-bottom: solid 0px #ededed;
}

a.emp {
  color: white;
  background: #488fc4;
  padding: 5px 10px 5px 10px;
  border-radius: 10px;
}
a.emp:hover {
  text-decoration: unset;
}
a {
  font-size: 13px;
}
span.material-icons.info {
  font-size: 17px;
  cursor: auto;
  margin-left: 0px;
  position: relative;
  top: 3px;
  padding-right: 3px;
  color: #a7a7a7;
}
.home {
  width: 95%;
  margin: auto;
}
.row {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -20px;
  margin-left: -20px;
  border-bottom: solid 1px #ededed;
}

h4.delay {
  background-color: #72c7e7;
  border-radius: 10px;
  padding: 2px 7px 7px 0px;
  color: white;
  font-size: 12px;
  text-align: center;
}

span.material-icons.delay {
  cursor: default;
  color: white;
  /* margin-bottom: -5px; */
  position: relative;
  top: 5px;
  font-size: 18px;
}
h4.delay.col-2 {
  min-width: 95px !important;
  max-width: 110px !important;
}
.icons.col-4 {
  text-align: right;
}
</style>
