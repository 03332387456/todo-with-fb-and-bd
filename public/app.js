 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
 import 
 { getDatabase , set , ref , push , remove , update} 
 from 
 "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyB84FRpgR0IdOyJuA9WibrK28ydAOPnarI",
   authDomain: "todoapp-with-databse.firebaseapp.com",
   projectId: "todoapp-with-databse",
   storageBucket: "todoapp-with-databse.appspot.com",
   messagingSenderId: "434970602767",
   appId: "1:434970602767:web:a98e667f830cfa622a627a",
   measurementId: "G-D5BY9L5NJW"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
 const db = getDatabase()




var inp = document.getElementById("input")

var array = []

window.add = function(){
    var inpvalue = inp.value
    var obj = {
        name: inpvalue
    }
    array.push(obj)
    rendervalInUL()
    console.log(array);
   


    var reference = push(ref(db , "todosTasks/"))
     set(reference , {
      inp: inp.value
     })


     inp.value = ""
}


var ul = document.getElementById("ul")

function rendervalInUL() {
    ul.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
      ul.innerHTML += `<li>${array[i].name} 
      <button type="button" onclick="delbtn(${i})" class="btn btn-outline-danger m-3">Delete</button>
      <button type="button" onclick="editBtn(${i})" class="btn btn-outline-primary m-3">Edit</button>
       </li>`;
    }
  }



 window.delbtn = function(i) {
    array.splice(i ,1)
    remove(ref(db , "todosTasks/"))
    rendervalInUL()
  }

  delbtn()


  



window.editBtn = function(i) {
  var newName = prompt("Enter new name");
  if (newName) {
    array[i].name = newName;
    rendervalInUL();
    updateDataInFirebase(i, newName);
  }
}

function updateDataInFirebase(i, newName) {
  var updates = {};
  updates['todosTasks/' + i + 'NewName/'] = newName;
  update(ref(db), updates);
}






