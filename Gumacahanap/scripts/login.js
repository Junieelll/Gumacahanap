
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, FacebookAuthProvider  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = initializeApp({
  apiKey: "AIzaSyDwvEL5bOzd7FY5rPwMpjUv86hS2vvSzzc",
  authDomain: "gumacahanap.firebaseapp.com",
  projectId: "gumacahanap",
  storageBucket: "gumacahanap.appspot.com",
  messagingSenderId: "526338790926",
  appId: "1:526338790926:web:c0fe171e5b9562fff24e5f",
  measurementId: "G-EHG533M229"
});

const email = document.querySelector('#email');
const password = document.querySelector('#password');
const btnLogin = document.querySelector('#btnLogin');
const btnSignup = document.querySelector('#btnSignup');
const signInWithGoogleButton = document.querySelector('#googleBtn');
const signInWithFacebookButton = document.querySelector('#fbBtn');



const auth = getAuth(firebaseConfig);
const provider = new GoogleAuthProvider(auth);
const facebookProvider = new FacebookAuthProvider(auth);



const loginEmailPassword = async () => {
    const loginEmail  = email.value;
    const loginPassword  = password.value;
    
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    console.log(userCredential.user);
    handleSignIn(userCredential.user);
}

btnLogin.addEventListener("click", loginEmailPassword)

signInWithGoogleButton.addEventListener('click', () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            
            console.log("User data before stored:", user);
            if (user) {
                
                handleSignIn(user);
                console.log("User data after storing in cookies:");
                console.log("Username:", getCookie('username'));
                console.log("Name:", getCookie('name'));
                console.log("Profile Picture URL:", getCookie('profilePicture'));
                console.log("Email:", getCookie('email'));
                console.log("UID:", getCookie('uid'));

               
                
            } else {
                console.error("User object is null or undefined");
            }
        })
        .catch((error) => {
            console.error(error.message);
        });
});

signInWithFacebookButton.addEventListener('click', () => {
    signInWithPopup(auth, facebookProvider)
        .then((result) => {
            const user = result.user;
            handleSignIn(user);
        })
        .catch((error) => {
            console.error("Error during Facebook sign-in:", error.message);
        });
});

function handleSignIn(user) {
    sessionStorage.setItem('username', user.displayName);
    sessionStorage.setItem('name', user.displayName);
    sessionStorage.setItem('profilePicture', user.photoURL);
    sessionStorage.setItem('email', user.email);
    sessionStorage.setItem('uid', user.uid);

    document.cookie = `username=${user.displayName}; path=/`;
    document.cookie = `name=${user.displayName}; path=/`;
    document.cookie = `profilePicture=${user.photoURL}; path=/`;
    document.cookie = `email=${user.email}; path=/`;
    document.cookie = `uid=${user.uid}; path=/`;

    window.location.href = 'views/index.html';
}

onAuthStateChanged(auth, (user) => {
    if (user) {
      
      const uid = user.uid;
      console.log(uid);
      // ...
    } else {
      // User is signed out
      // ...
        console.log('user is signed out');
      
    }
  });


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}



