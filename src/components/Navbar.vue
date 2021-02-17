<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    
    <router-link :to="{ name: 'Index' }">
                    <img width="150" src="@/assets/logo_Far_350_c.png"></router-link>

                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
    <li class="nav-item">
          <router-link :to="{ name: 'Index' }" v-if="isLoggedIn" class="nav-link">Tableau de bord</router-link>
        </li>
         <li class="nav-item">
          <router-link :to="{ name: 'AddClient' }" v-if="isLoggedIn" class="nav-link">Ajouter client</router-link>
        </li>

        <li class="nav-item">
          <router-link :to="{ name: 'Articles' }" v-if="isLoggedIn" class="nav-link">Ajouter articles</router-link>
        </li>
         <li class="nav-item">
          <router-link :to="{ name: 'Order' }" v-if="isLoggedIn" class="nav-link">Ordre</router-link>
        </li>

       

       
      </ul>
    <form class="d-flex">
      
     
      <a v-if="isLoggedIn"><button v-on:click="logout" class="btn btn-outline-primary">Déconnecter</button></a>
                
    </form>
  </div>
</nav>
     
    
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'Navbar',
    data() {
        return {
            isLoggedIn: false,
            currentUser: false
        }
    },
    created() {
        if(firebase.auth().currentUser) {
            this.isLoggedIn = true;
            this.currentUser = firebase.auth().currentUser.email;
        }
    },
    methods: {
        logout: function(){
            firebase.auth().signOut().then(() => {
                this.$router.push('/login');
            });
        }
    }
}
</script>

<style>
ul.right {
    padding-top: 18px;
}
.navbar nav{
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
.navbar-light .navbar-nav .nav-link {
    color: rgb(255 255 255);
}
li.nav-item {
   
    color: #fff;
    background: #4587bf;
    padding: 0px 0px 0px 0px;
    border-radius: 5px;
    margin-left: 5px;
    margin-right: 5px;
        margin-bottom: 5px;
}
.navbar-light .navbar-nav .nav-link:hover {
    color: rgb(70 135 190);
    background-color: white;
    border-color: rgb(70 135 190) !important;
}



li.nav-item:hover {
   
    color: #4587bf;
    border-color: #4587bf;
    background: #fff;
    padding: 0px 5px 0px 5px;
    border-radius: 5px;
    margin-left: 5px;
    margin-right: 5px;
        margin-bottom: 5px;
        text-decoration: none !important;
        
}



a.nav-link.router-link-exact-active.router-link-active {
    color: #fff!important;
    border-color: #4587bf;
    background: #71c7e8;
    border-radius: 5px;
}

.nav-link:hover {
    color: rgb(70 135 190);
}
a:not(.md-button):hover {
    text-decoration: none;
}

</style>