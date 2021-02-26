<template>
  <div style="width: 95%;margin: auto;">
    <div class="filtre">
      <FilterClientsNav
        @filterChange="current = $event"
        :clients="filteredClients"
        :current="current"
      />
    </div>
    <div v-for="(client, i, k) in currentClient" :key="k">
      <SingleClient :client="client"/>
    </div>
    
  </div>
</template>

<script>
import db from "@/firebase/init";
import SingleClient from "../components/SingleClient.vue";
import FilterClientsNav from "../components/FilterClientsNav.vue";


export default {
  name: "Index",
  components: { SingleClient, FilterClientsNav },
  data() {
    return {
      clients: [],
      showDetails: false,
      current: ""
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
          this.clients = this.clients.filter(client => {
            return client.id != id;
          });
        });
    }
  },
  computed: {
    currentClient() {
      let current;
      try {
        current = this.current || this.filteredClients[0].articles[0];
      } catch (error) {
        return null;
      }
      let cClient = [];
      this.filteredClients.map(c =>
        c.articles.map(n => (n.name === current.name ? cClient.push(c) : null))
      );
      return cClient;
    },
    filteredClients() {
      return this.clients;
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
  },
  async mounted() {
    this.filteredClients.map(v => console.log(v.nom));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index {
  display: block !important;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 0px !important;
  /* width: 90%; */
}

a {
    font-size: 13px;
}

.collection {
  margin: -0.7rem 0 1rem 0;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

body {
  background: #3978b7;

  font-family: "Istok Web", sans-serif;
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
    max-width: 960px;
    margin: auto;
}
</style>
