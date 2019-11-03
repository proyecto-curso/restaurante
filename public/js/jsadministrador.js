


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
var idadmin = "";
var input = document.getElementById('input');
var boton = document.getElementById('actualizar');

function listaradmin() {
    boton.style.display = 'none';
    input.style.display = 'none';
    listaadmin.innerHTML = "";

    
    db.collection("personas").get().then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
            listaadmin.innerHTML += `
                <tr>
                    <td>${doc.data().user2}</td>
                    <td>${doc.data().rol}</td>
                    <td>${doc.data().email}</td>
                    <td>${doc.data().pass2}</td>
                   
                   
                    <td>
                        <button onclick="leer('${doc.id}')" type="button" class="btn btn-default fas fa-edit"></button>
                        <button onclick="eliminar('${doc.id}')" type="button" class="btn btn-default fas fa-trash-alt"></button>
                    </td>
                </tr>
            `;
        });
    });


}




function leer(id) {
    ;
    idadmin = id;
    db.collection("personas").doc(id)
        .onSnapshot(async function (doc) {
            boton.style.display = 'inline';
            input.style.display = 'inline';
            input.value = doc.data().rol;
        });
}




function actualizarrol() {
    var dato = db.collection("personas").doc(idadmin);

    dato.update({
        rol: input.value,

    })
        .then(function () {
            console.log('rol actualizado');

            listaradmin();
        })
        .catch(function (err) {
            console.error("Error: ", err);
        })
}

function eliminar(id) {
    var dato = db.collection("personas").doc(id).delete()
        .then(function () {
            console.log("Noticia Eliminada!");
            listaradmin();
        }).catch(function (error) {
            console.error("Error: ", error);
        });

}

listaradmin();





