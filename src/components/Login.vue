<template>
  <div>
    <div class ="card mx-auto" style="width:600px">
    <div class="card-body text-center">
      <div>
        <div>
          <h3 class="conn">Connexion</h3>
          <form action="index.html">
            <div>
              <i class="material-icons prefix">email</i>
              <span class="blue-text" for="email">Addresse email</span>
              <input type="email" align="center" class="form-control" id="email"  v-model="email">
              
            </div>
            <div>
              <i class="material-icons prefix">lock</i>
              <span class="blue-text" for="password">Mot de passe</span>
              <input class="form-control" type="password" id="password" v-model="password">
              
            </div>
            <button v-on:click="login" class="btn btn-primary">Se connecter</button>
          </form>
        </div>
      </div>
    </div>
  </div>




  </div>


  
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'login',
  data: function() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login: function(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(`You are logged in as ${user.email}`);
            this.$router.push('/');
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    }
  }
};
</script>

<style>


input:focus {
  border-bottom: 1px solid #3f8dc5 !important;
  box-shadow: 0 1px 0 0 #3f8dc5 !important;
}

.container {
    padding-top: 40px;
     
        
    
}

.conn {
  padding-bottom: 15px;
}
.champs {
    align-items: center;
    color: rgb(38, 50, 56);
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 1px;
    background: rgba(136, 126, 126, 0.04);
   padding: 10px 10px;
    border: none;
    border-radius: 20px;
    outline: none;
    box-sizing: border-box;
    
 
    
    
    margin-bottom: 27px;
    font-family: 'Ubuntu', sans-serif;
}

 body {
        background-color: #3f8dc5;
        font-family: 'Ubuntu', sans-serif;
    }
    
    span.blue-text {
    vertical-align: top;
}
    .main {
        background-color: #FFFFFF;
        width: 400px;
        height: 400px;
        margin: 7em auto;
        border-radius: 1.5em;
        box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
    }
    
    .sign {
        padding-top: 40px;
        color: #8C55AA;
        font-family: 'Ubuntu', sans-serif;
        font-weight: bold;
        font-size: 23px;
    }
    
    
    
    form.form1 {
        padding-top: 40px;
    }
    
    .pass {
            width: 76% !important;
    color: #3f8dc5!important;
    font-weight: 700 !important;
    font-size: 14px !important;
    letter-spacing: 1px !important;
    background: rgba(136, 126, 126, 0.04) !important;
    padding: 0px !important;
    border: none !important;
    border-radius: 20px !important;
    outline: none !important;
    box-sizing: border-box !important;
    border: 2px solid rgba(0, 0, 0, 0.02) !important;
    margin-bottom: 50px !important;
    margin-left: 46px !important;
    text-align: center!important;
    margin-bottom: 27px !important;
    font-family: 'Ubuntu', sans-serif !important;
    }
    
   
    .un:focus, .pass:focus {
        border: 2px solid rgba(0, 0, 0, 0.18) !important;
        
    }
    
   .form-control {
     margin-bottom: 20px;
   }   
    .forgot {
        text-shadow: 0px 0px 3px rgba(117, 117, 117, 0.12);
        color: #E1BEE7;
        padding-top: 15px;
    }
    
    a {
        text-shadow: 0px 0px 3px rgba(117, 117, 117, 0.12);
        color: #E1BEE7;
        text-decoration: none
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

</style>