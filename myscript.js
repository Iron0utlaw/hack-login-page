// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAEF9eTOrMuIKndaLcjRCCyhxj76-qA5XE",
    authDomain: "auth-hacka.firebaseapp.com",
    databaseURL: "https://auth-hacka-default-rtdb.firebaseio.com",
    projectId: "auth-hacka",
    storageBucket: "auth-hacka.appspot.com",
    messagingSenderId: "676089450635",
    appId: "1:676089450635:web:97ef5974e67ce16810848e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();


signup.addEventListener('click', (e) => {

    var email = document.getElementById('Email').value;
    var password = document.getElementById('Password').value;
    var CPassword = document.getElementById('CPassword').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;

            set(ref(database, 'users/' + user.uid), {
                email: email
            });
            alert('user created');
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            alert(errorMessage);
        })
})

login.addEventListener('click', (e) => {
    
    var email = document.getElementById('Email').value;
    var password = document.getElementById('Password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const dt = new Date();
            update(ref(database, 'users/' + user.uid), {
                last_login: dt,
            })

            alert('Login Successful');
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            alert(errorMessage);
        });
})