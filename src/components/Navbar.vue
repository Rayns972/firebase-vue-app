<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand">
      <img width="150" src="@/assets/logo_Far_350_c.png"
    /></a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" v-if="isLoggedIn">
          <a class="nav-link"
            ><router-link :to="{ name: 'Index' }" class="menu_button"
              >Tableau de bord</router-link
            ></a
          >
        </li>

        <li class="nav-item" v-if="isLoggedIn">
          <a class="nav-link"
            ><router-link :to="{ name: 'AddClient' }" class="menu_button"
              >Ajouter client</router-link
            ></a
          >
        </li>

        <li class="nav-item" v-if="isLoggedIn">
          <a class="nav-link"
            ><router-link :to="{ name: 'Articles' }" class="menu_button"
              >Ajouter articles</router-link
            ></a
          >
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <a class="nav-link"
            ><router-link :to="{ name: 'Order' }" class="menu_button"
              >Ordre</router-link
            ></a
          >
        </li>
      </ul>

      <form class="d-flex">
        <a v-if="isLoggedIn"
          ><button v-on:click="logout" class="btn btn-outline-primary">
            Déconnecter
          </button></a
        >
      </form>
    </div>
  </nav>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Navbar",
  data() {
    return {
      isLoggedIn: false,
      currentUser: false,
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/login");
        });
    },
  },
};
</script>

<style>
ul.right {
  padding-top: 18px;
}
.navbar nav {
  padding: 0 20px;
}

div#app {
  padding-top: 150px;
}

.btn-outline-primary {
  color: #408dc5;
  border-color: #408dc5;
}

.btn-outline-primary:hover {
  color: #fff;
  background-color: #408dc5;
  border-color: #408dc5;
}
.btn-outline-success:hover {
  color: #fff;
  background-color: #3978b7;
  border-color: #3978b7;
}
.btn-outline-success:not(:disabled):not(.disabled).active,
.btn-outline-success:not(:disabled):not(.disabled):active,
.show > .btn-outline-success.dropdown-toggle {
  color: #ffffff;
  background-color: #71c7e8;
  border-color: #71c7e8;
}

.btn-outline-success.focus,
.btn-outline-success:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgb(57 120 183 / 68%);
  box-shadow: 0 0 0 0.2rem rgb(57 120 183 / 55%);
}

.btn-outline-success:not(:disabled):not(.disabled).active:focus,
.btn-outline-success:not(:disabled):not(.disabled):active:focus,
.show > .btn-outline-success.dropdown-toggle:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgb(57 120 183 / 68%);
  box-shadow: 0 0 0 0.2rem rgb(57 120 183 / 55%);
}

a {
  font-size: 13px;
}

.btn-outline-success {
  color: #3978b7;
  border-color: #3978b7;
  margin-right: 10px;
}

.mr-auto,
.mx-auto {
  margin-right: auto !important;
  margin-left: auto;
}

a:not(.md-button):hover {
  text-decoration: none;
}
ul.navbar-nav.mr-auto {
  margin-top: 0px;
}
li.nav-item {
  /* margin-bottom: 18px; */
  padding-bottom: 10px !important;
  padding-top: 10px !important;
}
a.menu_button {
  background-color: #3978b700 !important;
  padding: 10px 10px 10px 10px !important;
  margin-left: 0px !important;
  margin-right: 0px !important;
  border-radius: 6px !important;
  color: #3978b7;
  border: 1px solid #3978b7;
  width: 50px;
  display: inline-flex;
  height: 40px;
  width: 150px;
  text-transform: uppercase;
  text-decoration: none;
  /* font-size: .8em; */
  /* letter-spacing: 1px; */
  align-items: center;
  justify-content: center;
  font-weight: 700;
}
a.menu_button.router-link-exact-active.router-link-active {
  background-color: #3978b7 !important;
  color: white;
}
a.menu_button:hover {
  background-color: #72c7e6 !important;
  color: white !important;
  border: 1px solid #72c7e6 !important;
}
.navbar-expand-lg .navbar-nav .nav-link {
  padding-right: 0rem !important;
  padding-left: 0rem !important;
}
a.nav-link {
  border-radius: 7px;
  /* color: brown; */
  margin: 5px 5px 5px 5px;
  text-align: center;
  padding-right: 0;
  padding-left: 0;
  padding-top: 0;
  padding-bottom: 0;
}
</style>