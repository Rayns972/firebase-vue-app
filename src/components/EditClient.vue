<template>
  <div v-if="client">
    <div class="text-center">
      <h2 class="card-title">Modifier client</h2>
    </div>

    <div class="card mx-auto add" style="width: 80%">
      <form class="card-body add" @submit.prevent="EditClient">
        <form>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputName">Prénom</label>
              <input
                type="text"
                class="form-control"
                name="title"
                v-model="client.title"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputprenom">Nom</label>
              <input
                type="text"
                class="form-control"
                name="nom"
                v-model="client.nom"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="inputTel">Fixe</label>
            <input
              type="text"
              class="form-control"
              name="fixe"
              v-model="client.fixe"
            />
          </div>

          <div class="form-group">
            <label for="inputTel">Portable</label>
            <input
              type="text"
              class="form-control"
              name="portable"
              v-model="client.portable"
            />
          </div>

          <div class="form-group">
            <label for="inputEmail4">Email</label>
            <input
              type="email"
              class="form-control"
              name="email"
              v-model="client.email"
            />
          </div>

          <div class="form-group">
            <label for="inputAddress">Adresse</label>
            <input
              type="text"
              class="form-control"
              name="adresse"
              v-model="client.adresse"
            />
          </div>

          <div class="form-row">
            <div class="form-group col-md-10">
              <label for="inputCity">Ville</label>
              <input
                type="text"
                class="form-control"
                name="ville"
                v-model="client.ville"
              />
            </div>

            <div class="form-group col-md-2">
              <label for="inputZip">CP</label>
              <input type="text" class="form-control" v-model="client.cp" />
            </div>
          </div>
        </form>
        <div
          class="row row-cols-4"
          v-for="(article, index, key) in client.articles"
          :key="key"
        >
          <div class="form-group col-md-2">
            <label for="qte">Quantité</label>

            <input
              @input="$forceUpdate()"
              v-model="client.articles[index].qty"
              class="form-control"
              type="number"
              value="1"
              min="1"
              max="1000"
            />
          </div>
          <!-- article -->
          <div class="form-group col-md-4">
            <label for="article">Choisir article</label>
            <select
              @change="$forceUpdate()"
              v-model="client.articles[index].article"
              name="article"
              class="custom-select"
              aria-label="Default select example"
            >
              <option
                v-for="article in articlesAutoComplete"
                :key="article.id"
                :value="article.titre"
              >
                {{ article.titre }}
              </option>
            </select>
          </div>
          <!-- la taille -->
          <div class="form-group col-md-2">
            <label for="taille">Taille</label>
            <input
              type="text"
              class="form-control"
              name="Taille"
              @input="$forceUpdate()"
              v-model="client.articles[index].taille"
            />
          </div>
          <!-- employé -->
          <div class="form-group col-md-3">
            <label for="article">Choisir employé</label>
            <select
              @change="$forceUpdate()"
              v-model="client.articles[index].name"
              name="name"
              class="custom-select"
              aria-label="Default select example"
            >
              <option
                v-for="employe in employesAutoComplete"
                :key="employe.id"
                :value="employe.name"
              >
                {{ employe.name }}
              </option>
            </select>
          </div>

          <div class="form-group col-md-1">
            <span
              class="material-icons del"
              @click.prevent="deleteArticle(article.id)"
              >delete</span
            >
          </div>
        </div>

        <div
          class="row row-cols-4"
          v-for="(article, index, key) in articles"
          :key="key"
        >
          <div class="form-group col-md-2">
            <label for="qte">Quantité</label>

            <input
              @input="$forceUpdate()"
              v-model="client.articles[index].qty"
              class="form-control"
              type="number"
              value="1"
              min="1"
              max="1000"
            />
          </div>
          <!-- article -->
          <div class="form-group col-md-4">
            <label for="article">Choisir article</label>
            <select
              @change="$forceUpdate()"
              v-model="client.articles[index].article"
              name="article"
              class="custom-select"
              aria-label="Default select example"
            >
              <option
                v-for="article in articlesAutoComplete"
                :key="article.id"
                :value="article.titre"
              >
                {{ article.titre }}
              </option>
            </select>
          </div>
          <!-- la taille -->
          <div class="form-group col-md-2">
            <label for="taille">Taille</label>
            <input
              type="text"
              class="form-control"
              name="Taille"
              @input="$forceUpdate()"
              v-model="client.articles[index].taille"
            />
          </div>
          <!-- employé -->
          <div class="form-group col-md-3">
            <label for="article">Choisir employé</label>
            <select
              @change="$forceUpdate()"
              v-model="client.articles[index].name"
              name="name"
              class="custom-select"
              aria-label="Default select example"
            >
              <option
                v-for="employe in employesAutoComplete"
                :key="employe.id"
                :value="employe.name"
              >
                {{ employe.name }}
              </option>
            </select>
          </div>
          <div class="form-group col-md-1">
            <span
              class="material-icons del"
              @click.prevent="deleteArticle2(index)"
              >delete</span
            >
          </div>
        </div>

        <!-- quantite -->
        <div class="form-row">
          <div class="form-group col-md-2">
            <label for="qte">Quantité</label>

            <input
              v-model="qty"
              class="form-control"
              type="number"
              value="1"
              min="1"
              max="1000"
            />
          </div>

          <!-- article -->
          <div class="form-group col-md-4">
            <label for="article">Choisir article</label>
            <select
              v-model="article"
              name="article"
              class="custom-select"
              aria-label="Default select example"
            >
              <option
                v-for="article in articlesAutoComplete"
                :key="article.id"
                :value="article.titre"
              >
                {{ article.titre }}
              </option>
            </select>
          </div>

          <!-- la taille -->
          <div class="form-group col-md-3">
            <label for="taille">Taille</label>
            <input
              type="text"
              class="form-control"
              name="Taille"
              v-model="taille"
            />
          </div>
          <!-- employé -->
          <div class="form-group col-md-3">
            <label for="article">Choisir employé</label>
            <select
              v-model="name"
              name="name"
              class="custom-select"
              aria-label="Default select example"
            >
              <option
                v-for="employe in employesAutoComplete"
                :key="employe.id"
                :value="employe.name"
              >
                {{ employe.name }}
              </option>
            </select>
          </div>
        </div>

        <button class="btn btn-primary" type="submit" @click.prevent="addIng()">
          Ajouter
        </button>

        <div class="field center-align">
          <p v-if="feedback" class="red-text">{{ feedback }}</p>
          <button type="submit" class="btn blue">{{ "Enregistrer" }}</button>
          <router-link to="/" class="btn grey">Annuler</router-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "EditClient",
  data() {
    return {
      clients: [],
      client: null,
      another: null,
      feedback: null,
      taille: null,
      articles: [],
      articlesAutoComplete: [],
      employesAutoComplete: [],

      slug: null,
      titre: null,
      employes: [],
      employe: null,
      article: null,
      name: null,
      qty: null
    };
  },

  methods: {
    EditClient() {
      if ((this.client.title, this.client.nom)) {
        this.feedback = null;
        //create slug
        this.client.slug = slugify(this.client.title + this.client.nom, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        });
        db.collection("clients")
          .doc(this.client.id)
          .update({
            title: this.client.title,
            nom: this.client.nom,
            fixe: this.client.fixe,
            portable: this.client.portable,
            email: this.client.email,
            adresse: this.client.adresse,
            ville: this.client.ville,
            cp: this.client.cp,
            slug: this.client.slug
          })
          .then(data => {
            if (this.client.articles) {
              console.warn(this.client.articles);
              this.client.articles.forEach((element, index) => {
                db.collection("clients")
                  .doc(this.client.id)
                  .collection("articles")
                  .doc(element.id)
                  .set({ ...element });
                // just random methods
                // .delete()
                // .add({
                //   ...element
                // });
              });
            } else {
              alert("vous n'avez ajouté aucun article");
            }
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "you must blblbla title";
      }
    },

    deleteArticle2(i) {
      this.articles.splice(i, 1);
    },

    deleteArticle(id) {
      if (confirm("Êtes-vous sur de vouloir supprimer cet article ?")) {
        //effacer de firestore
        db.collection("clients")
          .doc(this.client.id)
          .collection("articles")
          .doc(id)
          .delete()
          .then(() => {
            this.client.articles = this.client.articles.filter(
              a => a.id !== id
            );
            this.$forceUpdate();
          });
      }
    },
    addIng() {
      if (this.qty && this.taille && this.article) {
        const article = {
          qty: this.qty,
          taille: this.taille,
          article: this.article,
          name: this.name
        };
        this.client.articles
          ? this.client.articles.push(article)
          : (this.client.articles = [{ ...article }]);
        this.qty = null;
        this.taille = null;
        this.article = null;
        this.name = null;
        // a = null;
      } else {
        this.feedback = "vous devez sélectionner des articles";
      }
    },
    deleteIng(ing) {
      this.client.ingredients = this.client.ingredients.filter(ingredient => {
        return ingredient != ing;
      });
    }
  },
  created() {
    let ref = db
      .collection("clients")
      .where("slug", "==", this.$route.params.client_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.client = doc.data();
        this.client.id = doc.id;
        db.collection("clients")
          .doc(doc.id)
          .collection("articles")
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              // get sub-collection data
              console.log(doc.data());
              let article = doc.data();
              article.id = doc.id;

              // get sub-collection id

              console.warn("._.", this.client.articles);
              if (this.client.articles) {
                this.client.articles.push(article);
              } else {
                // this the first item, that means there is no article item
                this.client.articles = [{ ...article }];
              }
              this.$forceUpdate();
            });
            // after all this push all data into clients
            this.clients.push(this.client);
          });
      });
    }),
      db
        .collection("articles")
        .orderBy("titre", "asc")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let article = doc.data();

            article.id = doc.id;
            this.articlesAutoComplete.push(article);
          });
        });

    db.collection("employes")
      .orderBy("name", "asc")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let employe = doc.data();

          employe.id = doc.id;
          this.employesAutoComplete.push(employe);
        });
      });
  }
};
</script>

<style>
body {
  background: #3978b7;
  font-family: "Ubuntu", sans-serif;
}

.card {
  border-left: 0px solid rgba(23, 143, 97, 0);
  border-radius: 6px;
  margin-bottom: 20px;
}

.add-client {
  margin-top: 0px;
  padding: 20px;
  max-width: 500px;
  background-color: white;
}
.add-client h2 {
  font-size: 2em;
  margin: 20px auto;
}
.add-client .field {
  margin: 20px auto;
  position: relative;
}

.add-client .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}

span.material-icons.del {
  position: relative;
  top: 37px;
  cursor: pointer;
}
</style>
