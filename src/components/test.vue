<template>
  <div class="index container">
    <div v-if="loading">
      <h1 class="my-6">loading...</h1>
    </div>
    <div
      v-else
      class="card"
      style="width: 600px"
      v-for="client in clients"
      :key="client.id"
    >
      <div class="card-body">
        <i class="material-icons delete" @click="deleteClient(client.id)"
          >delete</i
        >
        <h2 @click="showDetails = !showDetails" class="indigo-text">{{ client.title }} {{ client.nom }}</h2>
        <ul class="ingredients">
          <!-- <span>{{ client.articles }}</span> -->
         

          <div v-if="showDetails" class="container">
            <div
              class="row row-cols-4"
              v-for="(article, index, key) in client.articles"
              :key="key"
            >
            
              <div class="col-2">
                {{ article.qty }} x
              </div>
              <div class="col-4">
                {{ article.article }}
              </div>
              <div class="col-3">
                {{ article.taille }}
              </div>
              <div class="col">
                <label>
                  <span :class="{ completed: article.isChecked }"> Fait </span>
                  <input
                    type="checkbox"
                    class="filled-in"
                    v-model="article.isChecked"
                  />
                </label>
                
              </div>
              
            </div>
            
          </div>

          <div
            class="collection"
            v-for="(ing, key, index) in client.ingredients"
            :key="index"
          ></div>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab blue darken-2">
        <router-link
          :to="{ name: 'EditClient', params: { client_slug: client.slug } }"
        >
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "Index",
  data() {
    return {
      clients: [],
      loading: false,
      showDetails: false
    };
  },
  firestore() {
    return {
      clients: dbCollection.orderBy("createdAt", "desc"),
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
  created() {
    //récuperer data de firestore
    this.loading = true;
    db.collection("clients")
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
                console.log(article);

                // log the data
                console.log(article);

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
        console.log(this.clients);
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
.card {
  border-left: 6px solid rgb(131, 0, 0);
  border-radius: 6px;
      margin-bottom: 20px;
}
a {
    font-size: 13px;
}
.completed {
  text-decoration: line-through;
  color: grey;
}

.collection {
  margin: -0.7rem 0 1rem 0;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

body {
  background-color: #3f8dc5;
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
</style>


