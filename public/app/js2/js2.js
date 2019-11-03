

var firebaseConfig = {
  apiKey: "AIzaSyDFXwdqAGt8MLvf5RMOV65et5B802nF6R0",
  authDomain: "restaurante-vo-flora2000.firebaseapp.com",
  databaseURL: "https://restaurante-vo-flora2000.firebaseio.com",
  projectId: "restaurante-vo-flora2000",
  storageBucket: "restaurante-vo-flora2000.appspot.com",
  messagingSenderId: "631502986503",
  appId: "1:631502986503:web:bbfe5941b8385c28a439a2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();


var user2 = document.getElementById('user2');
var pass2 = document.getElementById('pass2');
var email = document.getElementById('email');

function validar() {


  db.collection("personas").get().then((querySnapshot) => {

    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().user2}`);

      if (doc.data().user2 == user2.value) {

        alert("Usuario ya registrado")

        window.location = "indexlogin.html";
      }

    });


    registrar();
    firebase.auth().createUserWithEmailAndPassword(email.value,pass2.value).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  });




}



function registrar() {
  db.collection("personas").add({

    user2: user2.value,
    pass2: pass2.value,
    email: email.value,
    rol: "user",

  })
  
    .then(function (docRef) {
      console.log("EL ID ES ", docRef.id);
      alert("El usuario se ha registrado exitosamente");
      
      window.location = "indexlogin.html";
    })
    .catch(function (error) {
      console.error("ERROR ", error);
    });

}


function ingreso() {

  db.collection("personas").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().user2}`);

      if (doc.data().user2 == user.value && doc.data().pass2 == pass.value) {
        alert("Bienvenido " + user.value);
        console.log("contraseña   " + doc.data().pass2);
        console.log("rol " + doc.data().rol);
        console.log("usuario correcto");
        if (doc.data().rol == "usuario") {
          alert("Bienvenido " + user.value + "eres usuario");
          window.location = "indexreservas.html";
         
         
        }
        if (doc.data().rol == "admin") {
          alert("Bienvenido " + user.value + "eres admin");
          window.location = "indexadmin.html";

        }
        if (doc.data().rol == "admin1") {
          alert("Bienvenido " + user.value + "eres administrador");
          window.location = "indexadministrador.html";

        }
      }

    });
  });

}


var user = document.getElementById('user');
var pass = document.getElementById('pass');





function ingresos() {
  console.log("dio click en boton");

  if (user.value == "user" && pass.value == "user") {
    console.log("USUARIO:" + user.value);
    console.log("USUARIO:" + pass.value);
    window.location = "indexreservas.html";

    //  window.location = "../../../indexreservas";
  }

  if (user.value == "admin" && pass.value == "admin") {
    window.location = "indexadmin.html";

  }


}



