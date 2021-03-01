<template>
  <div class="home">
    <div class="row recap">
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body recap">
            <h5 class="card-title">
              <strong>
                {{ filteredClients.length }}
                {{ filteredClients.length > 1 ? "Clients" : "Client" }}
              </strong>
            </h5>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body recap">
            <h5 class="card-title">
              <strong>Reste à faire {{ renaiming }} / {{ remaining2 }}</strong>
            </h5>
          </div>
        </div>
      </div>
    </div>

    <div class="filtre">
      <FilterNav @filterChange="current = $event" :current="current" />
    </div>

    <input
      class="form-control search"
      type="text"
      v-model="search"
      placeholder="Chercher client"
    />

    <div v-for="client in filteredClients" :key="client.id">
      <SingleClient :client="client" />
    </div>
    <br />
  </div>
</template>

<script>
import db from "@/firebase/init";
import SingleClient from "../components/SingleClient.vue";
import FilterNav from "../components/FilterNav.vue";
import { includes } from "lodash";

export default {
  name: "Index",
  components: { SingleClient, FilterNav },
  data() {
    return {
      clients: [],
      articles: [],
      article: { isChecked: "" },
      completed: false,
      search: "",
      showDetails: false,
      current: "all"
    };
  },

  methods: {
    mark(i) {
      db.collection("clients")
        .doc(id)
        .update({
          articles: db.FieldValue.arrayUnion("value1", "value2")
        })
        .then(() => {
          this.clients = this.clients.filter(client => client.id != id);
        });
    }
  },
  computed: {
    renaiming() {
      let renaiming = 0;
      this.filteredClients.map(c => {
        const rm = c.articles.filter(a => !a.isChecked);
        renaiming += rm.length;
      });
      return renaiming;
    },
    remaining2() {
      let renaiming = 0;
      this.filteredClients.map(c => {
        renaiming += c.articles.length;
      });
      return renaiming;
    },
    filteredClients() {
      if (this.current === "complet") {
        return this.clients.filter(client => client.completed);
      } else if (this.current === "encours") {
        return this.clients.filter(client => !client.completed);
      } else if (this.search) {
        return this.clients.filter(c => {
          const name = `${c.title} ${c.nom}`;
          return includes(name, this.search);
        });
      } else {
        return this.clients;
      }
    }
  },

  created() {
    //récuperer data de firestore

    db.collection("clients")
      .orderBy("timestamp", "desc")

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
              });
              // after all this push all data into clients
              this.clients.push(client);
            });
        });
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
div#app {
  max-width: 960px;
  margin: auto;
}
.index {
  display: block !important;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 0px !important;
  /* width: 90%; */
}

.card-body.recap {
  padding: 10px 10px 0px 10px !important;
  background-color: #3978b7 !important;
  color: white !important;
}
.row.recap {
  border-bottom: 0px !important;
  text-align: center;
  margin-bottom: 30px !important;
  margin-left: -15px !important;
  margin-right: -15px !important;
  /* padding: 10px 10px 0px 10px; */
}
.collection {
  margin: -0.7rem 0 1rem 0;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

input.form-control.search {
  margin-top: 10px;
}

a {
  font-size: 13px;
}

body {
  background: #3978b7;

  font-family: "IBM Plex Sans", sans-serif;
}
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
  color: #3f8dc5 !important;
}
.index .ingredients {
  margin: 30px auto;
}
.index .ingredients li {
  display: inline-block;
}

.index .delete {
  position: absolute;
  top: 6px;
  right: 6px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}

.index .edit {
  position: absolute;
  bottom: 6px;
  right: 6px;
  cursor: pointer;
  color: #3f8dc5;
  font-size: 1.4em;
}

ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 10px;
}
div#app {
  margin: auto;
}

.home {
  width: 95%;
  margin: auto;
}

a.btn.btn-primary.router-link-active {
  background-color: gray;
  border-color: gray;
  color: white;
}
</style>
