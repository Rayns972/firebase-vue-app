<template>
  <div class="home">
    <div class="filtre">
      <FilterNav @filterChange="current = $event" :current="current" />
    </div>
    <div v-for="client in filteredClients" :key="client.id">
      <SingleClient :client="client" />
    </div>
    <div>
      <button @click.prevent="suivant()" class="btn suivant">Suite...</button>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import SingleClient from "../components/SingleClient.vue";
import FilterNav from "../components/FilterNav.vue";

export default {
  name: "Order",
  components: { SingleClient, FilterNav },
  data() {
    return {
      clients: [],

      showDetails: false,
      current: "all",
      last: null,
      suivant: [],
    };
  },

  methods: {
    mark(i) {
      db.collection("clients")
        .doc(id)
        .update({
          articles: db.FieldValue.arrayUnion("value1", "value2"),
        })
        .then(() => {
          this.clients = this.clients.filter((client) => {
            return client.id != id;
          });
        });
    },
  },
  computed: {
    filteredClients() {
      if (this.current === "complet") {
        return this.clients.filter((client) => client.completed);
      }
      if (this.current === "encours") {
        return this.clients.filter((client) => !client.completed);
      }
      return this.clients;
    },
  },
  created() {
    //récuperer data de firestore

    db.collection("clients")
      .orderBy("name", "desc")
      .equalTo('Aucun')

      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let client = doc.data();
          client.id = doc.id;

          // start with sub-collections
          db.collection("clients")
            .doc(doc.id)
            .collection("articles")
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
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

.collection {
  margin: -0.7rem 0 1rem 0;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

body {
  background: #3978b7;

  font-family: "Ubuntu", sans-serif;
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
  max-width: 800px;
  margin: auto;
}
</style>
