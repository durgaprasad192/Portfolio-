import { initializeApp } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "portfolio-4dbe9.firebaseapp.com",
  projectId: "portfolio-4dbe9",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const googleBtn = document.getElementById("googleLoginBtn");
const errorBox = document.getElementById("loginError");

/* EMAIL LOGIN */
loginBtn.onclick = () => {
  errorBox.textContent = "";

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email.endsWith("@gmail.com")) {
    errorBox.textContent = "@gmail.com must be mentioned";
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => window.location.href = "dashboard.html")
    .catch(err => errorBox.textContent = err.message);
};

/* GOOGLE LOGIN */
googleBtn.onclick = () => {
  signInWithPopup(auth, provider)
    .then(() => window.location.href = "dashboard.html")
    .catch(err => {
      if (err.code !== "auth/popup-closed-by-user") {
        errorBox.textContent = err.message;
      }
    });
};

/* AUTO REDIRECT */
onAuthStateChanged(auth, user => {
  if (user) window.location.href = "dashboard.html";
});
