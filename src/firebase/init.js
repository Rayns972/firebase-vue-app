import firebase from 'firebase'
import firestore from 'firebase/firestore'
import 'firebase/auth'

var config = {
    apiKey: "AIzaSyCC6495CncZtwG-F5oZgrA6XB5_6YbkjyY",
    authDomain: "solutionsfar.firebaseapp.com",
    databaseURL: "https://solutionsfar-default-rtdb.firebaseio.com",
    projectId: "solutionsfar",
    storageBucket: "solutionsfar.appspot.com",
    messagingSenderId: "113737189223",
  };
  
  const firebaseApp = firebase.initializeApp(config);
  firebaseApp.firestore().settings({ timestampsInSnapshots: true})

  const projectAuth = firebase.auth()

 export default firebaseApp.firestore()
 export {projectAuth}

