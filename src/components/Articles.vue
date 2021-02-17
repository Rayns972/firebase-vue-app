



<template>
  <div>
    <div class="text-center">
      <h2 class="card-title">Ajouter un nouvel article</h2>
    </div>
    <div class="card mx-auto art" style="width: 600px">
      <div class="card-body">
        <label for="">Article :</label>
        <input type="text" name="titre" v-model="titre" />
        <button @click="submitName()" class="btn btn-primary">Ajouter</button>
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
      </div>
    </div>

    <div class="card mx-auto" style="width: 600px">
      <ul class="list-group" v-for="article in articles" :key="article.id">
        <li class="list-group-item">
          <span class="art-txt">{{ article.titre }}</span>
          <i class="material-icons delete" @click="deleteArticle(article.id)"
            >delete</i
          >
        </li>
      </ul>
    </div>
    <br>
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "Articles",
  data() {
    return {
      articles: [],
      feedback: null,
      titre: null,
    };
  },
  methods: {
    deleteArticle(id) {
      {
        if (confirm("Êtes-vous sur de vouloir supprimer cet article ?")) {
          //effacer de firestore
          db.collection("articles")
            .doc(id)
            .delete()
            .then(() => {
              this.articles = this.articles.filter((article) => {
                return article.id != id;
              });
            });
        }
      }
    },

    submitName() {
      if (this.titre) {
        this.feedback = null;
        db.collection("articles").add({
          titre: this.titre,
        });
        this.titre = null;
      } else {
        this.feedback = "Entrer un article";
      }
    },
  },

  created() {
    db.collection("articles")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let article = doc.data();
          article.id = doc.id;
          this.articles.push(article);
        });
      });
  },
};
</script>

<style>
.text-center {
  text-align: center !important;
  color: white;
  padding-bottom: 15px;
}
.list-group-item {
  border: 0px solid rgba(0, 0, 0, 0.125);
}

.red-text {
  color: red;
}

input[type="text"] {
  width: 392px;
}
i.material-icons.delete {
  position: absolute;
  right: 6px;
  cursor: pointer;
  font-size: 1.4em;
}

i.material-icons.delete:hover {
  color: #3f8dc5;
}

.btn-primary {
  background-color: #408dc5 !important;
  border-color: #408dc5 !important;
  margin-left: 20px;
}

.btn-primary:hover {
  color: #408dc5;
  background-color: #fff !important;
  border-color: #408dc5 !important;
}
.card.mx-auto.art {
  margin-bottom: 20px;
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
.art-txt {
  vertical-align: text-bottom;
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

i.material-icons.delete {
  cursor: pointer;
}

.articles.container {
  background-color: white;
  padding: 20px;
  margin-top: 40px;
}
hr.dotted {
  border-top: 1px dotted #bbb;
}

.add_article {
  padding-bottom: 30px;
}

.list-group {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-direction: column;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  border-radius: 0rem;
}
</style>