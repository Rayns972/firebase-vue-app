<template>
  <div>
    <div class="text-center">
      <h2 class="card-title">Ajouter un nouveau client</h2>
    </div>
    <div class="card add" style="width: 80%">
      <form class="card-body add" @submit.prevent="AddClient">
        <form>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputName">Prénom</label>
              <input
                type="text"
                class="form-control"
                name="title"
                v-model="title"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputprenom">Nom</label>
              <input
                type="text"
                class="form-control"
                name="nom"
                v-model="nom"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="inputTel">Fixe</label>
            <input
              type="text"
              class="form-control"
              name="fixe"
              v-model="fixe"
            />
          </div>

          <div class="form-group">
            <label for="inputTel">Portable</label>
            <input
              type="text"
              class="form-control"
              name="portable"
              v-model="portable"
            />
          </div>

          <div class="form-group">
            <label for="inputEmail4">Email</label>
            <input
              type="email"
              class="form-control"
              name="email"
              v-model="email"
            />
          </div>

          <div class="form-group">
            <label for="inputAddress">Adresse</label>
            <input
              type="text"
              class="form-control"
              name="adresse"
              v-model="adresse"
            />
          </div>

          <div class="form-row">
            <div class="form-group col-md-10">
              <label for="inputCity">Ville</label>
              <input
                type="text"
                class="form-control"
                name="ville"
                v-model="ville"
              />
            </div>

            <div class="form-group col-md-2">
              <label for="inputZip">CP</label>
              <input type="text" class="form-control" name="cp" v-model="cp" />
            </div>
          </div>
        </form>

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
        <button
          class="btn btn-primary add"
          type="submit"
          @click.prevent="addIng()"
        >
          Ajouter
        </button>

        <!-- <div v-for="(ing, index) in ingredients" :key="index" class="field">
                <label for="ingredient">Articles :</label>
                <input type="text" name="ingredient" v-model="ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div> -->

        <!-- <div class="field add-ingredients">
                <label for="add-ingredient">Ajouter articles</label>
                
                <input v-model="another" type="text"/>
                
            </div> -->

        <div
          class="row row-cols-4"
          v-for="(article, index, key) in articles"
          :key="key"
        >
          <div class="form-group col-md-2">
            <label for="qte">Quantité</label>

            <input
              v-model="article.qty"
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
              v-model="article.article"
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
              v-model="article.taille"
            />
          </div>
          <!-- employé -->
          <div class="form-group col-md-3">
            <label for="article">Choisir employé</label>
            <select
              v-model="article.name"
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
              @click.prevent="deleteArticle(index)"
              >delete</span
            >
          </div>
        </div>

        <div class="save exit">
          <p v-if="feedback" class="red-text">{{ feedback }}</p>

          <button type="submit" class="btn btn-primary">
            {{ "Enregistrer" }}
          </button>
          <router-link to="/" class="btn btn-primary">Annuler</router-link>
        </div>
      </form>
    </div>
    <br />
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "AddClient",
  data() {
    return {
      value: 1,
      articles: [],
      articlesAutoComplete: [],
      employesAutoComplete: [],
      employes: [],
      employe: null,
      article: null,
      title: null,
      nom: null,
      qty: null,
      fixe: null,
      portable: null,
      email: null,
      adresse: null,
      ville: null,
      cp: null,
      another: null,
      feedback: null,
      slug: null,
      titre: null,
      taille: null,

      name: null,
    };
  },
  methods: {
    AddClient() {
      if ((this.title, this.nom)) {
        this.feedback = null;
        //create slug
        this.slug = slugify(this.title + this.nom, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });
        db.collection("clients")
          .add({
            title: this.title,
            nom: this.nom,
            fixe: this.fixe,
            portable: this.portable,
            email: this.email,
            adresse: this.adresse,
            ville: this.ville,
            cp: this.cp,
            slug: this.slug,
            completed: false,
            createdAt: new Date(),
          })
          .then((data) => {
            
            // start with sub-collections --> Add data
            this.articles.forEach((element, index) => {
              db.collection("clients")
                .doc(data.id)
                .collection("articles")
                .add({
                  ...element,
                })
                .then(() => {
                  this.$router.push({ name: "Index" });
                });
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.feedback = "Il manque des informations";
      }
    },
    deleteArticle(i) {
      this.articles.splice(i, 1);
    },
    addIng() {
      if (this.qty && this.taille && this.article && this.name) {
        const article = {
          qty: this.qty,
          taille: this.taille,
          article: this.article,
          name: this.name,
          isChecked: false,
        };
        this.articles.push(article);
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
      this.ingredients = this.ingredients.filter((ingredient) => {
        return ingredient != ing;
      });
    },
  },
  created() {
    db.collection("articles")
      .orderBy("titre", "asc")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let article = doc.data();
          console.log("article", article);
          article.id = doc.id;
          this.articlesAutoComplete.push(article);
        });
      });
    db.collection("employes")
      .orderBy("name", "asc")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let employe = doc.data();
          console.log("employe", employe);
          employe.id = doc.id;
          this.employesAutoComplete.push(employe);
        });
      });
  },
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
  margin: auto;
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

.md-menu-content-container.md-scrollbar.md-theme-default {
  background-color: #d7eeff;
}

.add-client {
  margin-top: 60px;
  padding: 20px;
  max-width: 600px;
}

.md-list {
  width: 320px;
  max-width: 100%;
  display: inline-block;
  vertical-align: top;
  border: 1px solid rgba(#000, 0.12);
}

.text-center {
  text-align: center !important;
  color: white;
  padding-bottom: 15px;
}
.red-text {
  color: red;
}

.material-icons {
  position: relative;
  top: 7px;
}

.btn.btn-primary {
  color: #fff;
  border-color: #408dc5;
  background-color: #408dc5;
}

.btn.btn-primary:hover {
  color: #408dc5;
  border-color: #408dc5;
  background-color: #fff;
}
.navbar-light .navbar-nav .nav-link:hover {
    color: rgb(70 135 190) !important;
    background-color: white;
    border-color: rgb(70 135 190) !important;
};
span.material-icons.del {
  position: relative;
  top: 40px;
  cursor: pointer;
}

button.btn.btn-primary.add {
  margin-bottom: 15px;
}

.save.exit {
  text-align: center;
}

a.btn.btn-primary.router-link-active {
  background-color: gray;
  border-color: gray;
  color: white;
}

a.nav-link {
  text-align: center;
}

.navbar-nav .nav-link {
  padding-right: 10px;
  padding-left: 10px;
}

input[type="text"] {
    width: 100% !important;
}

span.material-icons.del {
        position: relative;
    top: 37px;
    cursor: pointer;
}
</style>
