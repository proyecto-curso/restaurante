
//Base de datos//
var firebaseConfig = {
  apiKey: "AIzaSyDFXwdqAGt8MLvf5RMOV65et5B802nF6R0",
  authDomain: "restaurante-vo-flora2000.firebaseapp.com",
  databaseURL: "https://restaurante-vo-flora2000.firebaseio.com",
  projectId: "restaurante-vo-flora2000",
  storageBucket: "gs://restaurante-vo-flora2000.appspot.com",
  messagingSenderId: "631502986503",
  appId: "1:631502986503:web:bbfe5941b8385c28a439a2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var storage = firebase.storage();
var db = firebase.firestore();
Nombreplato = document.getElementById('Nombreplato');
Precioplato = document.getElementById('Precioplato');
Descripcion = document.getElementById('Descripcion');
Imagenplato = document.getElementById('Imagenplato');
ListaPlato = document.getElementById('ListaPlatos');
Contenedor = document.getElementById('Contenedor');
btAceptar = document.getElementById('btAceptar');
btActualizar = document.getElementById('btActualizar');

Contenedor.style.display = 'none';
btActualizar.style.display = 'none';
idPlatos = "";

//Pagina principal para la lista platos
Listaplatos2 = document.getElementById('ListaPlatos2');

function Atras() {
  document.querySelector('.cont_forms').className = "cont_forms";
  document.querySelector('.cont_form_sign_up').style.opacity = "0";
  document.querySelector('.cont_form_login').style.opacity = "0";

  setTimeout(function () {
      document.querySelector('.cont_form_sign_up').style.display = "none";
      document.querySelector('.cont_form_login').style.display = "none";
  }, 500);
  Nombreplato.value = "";
  Precioplato.value = "";
  Descripcion.value = "";
  Imagenplato.value = "";
}

function Aceptar() {
  if (Nombreplato.value.length == 0 || Precioplato.value.length == 0 ||
      Descripcion.value.length == 0 || Imagenplato.value.length == 0) {
      alert('Un plato vacio nadie lo compraria');
  } else {
      db.collection("Platos").add({
          Nombreplato: Nombreplato.value,
          Precioplato: Precioplato.value,
          Descripcion: Descripcion.value,
          Imagenplato: Imagenplato.value,
      })
          .then(function (docRef) {
              console.log("Document written with ID: ", docRef.id);
              listarPlatos();
          })
          .catch(function (error) {
              console.error("Error: ", error);
          });
      Nombreplato.value = "";
      Precioplato.value = "";
      Descripcion.value = "";
      Imagenplato.value = "";
  }
}
//Fin base de datos//

//Pagina index.html solo imagen
function listarPlatos2() {
  Listaplatos2.innerHTML = "";
  db.collection("Platos").get().then((querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
          Listaplatos2.innerHTML += `  
          <div class="box sort">
          <img src="img/portfolio/bagre.jpg" alt="">
           <div class="details">
              <div class="tittle">${doc.data().Nombreplato}</div>
              <div class="price">${doc.data().Precioplato}</div>
              <button onclick="leerplatos('${doc.id}')" type="button" class="btn btn-default fas fa-edit"></button>
              <button onclick="eliminar('${doc.id}')" type="button" class="btn btn-default fas fa-trash-alt"></button>
           </div>
          </div>
            `;
      });
  });
}
//Listar
function listarPlatos() {
  ListaPlato.innerHTML = "";
  db.collection("Platos").get().then((querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
          ListaPlato.innerHTML += `<div class="box sort">
            <img src="img/portfolio/bagre.jpg" alt="">
             <div class="details">
                <div class="tittle">${doc.data().Nombreplato}</div>
                <div class="price">${doc.data().Precioplato}</div>
                <button onclick="leerplatos('${doc.id}')" type="button" class="btn btn-default fas fa-edit"></button>
                <button onclick="eliminar('${doc.id}')" type="button" class="btn btn-default fas fa-trash-alt"></button>
             </div>
            </div>
            `;
      });
  });
}


//Poner datos en el cuadrito de agregar platos. L.M.S

function leerplatos(id) {
  idPlatos = id;
  btActualizar.style.display = 'inline';
  btAceptar.style.display = 'none';
  Contenedor.style.display = 'inline';
  db.collection("Platos").doc(id)
      .onSnapshot(async function (doc) {
          Nombreplato.value = doc.data().Nombreplato,
          Precioplato.value = doc.data().Precioplato,
          Descripcion.value = doc.data().Descripcion,
          Imagenplato.value = doc.data().Imagenplato
      });
}

//Obtiene los datos modificados y se actualiza, despues el cuadrito vuelve como antes
function Actualizar() {
  var dato = db.collection("Platos").doc(idPlatos);
  dato.update({
      Nombreplato: Nombreplato.value,
      Precioplato: Precioplato.value,
      Descripcion: Descripcion.value,
      Imagenplato: Imagenplato.value,
  })
      .then(function () {
          console.log('Plato actualizada');

          listarPlatos();
      })
      .catch(function (err) {
          console.error("Error: ", err);
      })
      Nombreplato.value = "";
      Precioplato.value = "";
      Descripcion.value = "";
      Imagenplato.value = "";
      btActualizar.style.display = 'none';
     btAceptar.style.display = 'inline';
}

function eliminar(id) {
  var dato = db.collection("Platos").doc(id).delete()
      .then(function () {
          console.log("Plato Eliminado!");
          listarPlatos();
      }).catch(function (error) {
          console.error("Error: ", error);
      });


}

//Imagen//
SubirImagen = function () {
  //var img = Imagenplato[0].file[0] // No sirve esto
  //Un var que haga referencia a Imegenplato, con esta funcion permite cargar varios archivos
  //asi que solo se selecciona la primera opcion de ese archivo
  var imagen = document.getElementById('Imagenplato').files[0];
  var img = Imagenplato;
  console.log("Tu imagen es: ", img);
  var storageRef = storage.ref();
  var spaceRef = storageRef.child(Imagenplato.value);

  var earthRef = spaceRef.parent.child(Imagenplato.value);
  var path = spaceRef.fullPath
  // File name is 'space.jpg'
  var name = spaceRef.name

  // Points to 'images'
  var imagesRef = spaceRef.parent;
}
//Fin Imagen//
function volveradmin() {
  window.location = "indexadmin.html";

}
function volverprincipal() {
  window.location = "index.html";

}
function Agregar() {
  Contenedor.style.display = 'inline';

}
function Esconder() {
  Contenedor.style.display = 'none';
}


listarPlatos();

listarPlatos2();