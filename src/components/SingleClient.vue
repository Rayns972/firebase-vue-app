<template>
  <div class="client" :class="{ full: client.completed }">
    <div class="actions">
      <h4 @click="showDetails = !showDetails">
        {{ client.title }} {{ client.nom }}
      </h4>

      <div class="icons">
        <router-link
          :to="{ name: 'EditClient', params: { client_slug: client.slug } }"
        >
          <span class="material-icons">edit</span>
        </router-link>

        <span class="material-icons" @click="deleteClient(client.id)">
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
        <div class="col-1">{{ article.qty }} x</div>
        <div class="col-3">
          {{ article.article }}
        </div>
        <div class="col-3">
          {{ article.taille }}
        </div>
        <div class="col-3">Employé : {{ article.name }}</div>
        <div class="col-2">
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
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  props: ["client"],
  data() {
    return {
      clients: [],
      loading: false,
      showDetails: false,
      articles: [],
      article: { isChecked: "" },
      completed: false
    };
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
.client {
  margin: 16px auto;
  background: white;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 1px 2px 3px rgb(0, 0, 0, 0.2);
  border-left: 8px solid #aa5656;
  margin-left: 20px;
  margin-right: 20px;
}
h4 {
  cursor: pointer;
  text-transform: uppercase;
  margin-bottom: 0rem;
  font-size: 20px;
  font-weight: 600;
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

a {
  font-size: 0.8rem !important;
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
  width: 900px;
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
</style>
