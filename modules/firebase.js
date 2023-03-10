import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js';
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js"

const firebaseConfig = {

    apiKey: "AIzaSyCsOpI3Ws8F_1BfQV4qspnjwsuDI0XavZw",
    authDomain: "store-27853.firebaseapp.com",
    databaseURL: "https://store-27853-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "store-27853",
    storageBucket: "store-27853.appspot.com",
    messagingSenderId: "1043701083439",
    appId: "1:1043701083439:web:fb04134c5441ec912d45da"

};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {db}