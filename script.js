// 🔥 Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔐 Firebase config (USE YOUR OWN KEYS)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "portfolio-4dbe9.firebaseapp.com",
  projectId: "portfolio-4dbe9",
  appId: "YOUR_APP_ID"
};

// 🔌 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 🔗 HTML elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const googleBtn = document.getElementById("googleLoginBtn");
const errorBox = document.getElementById("loginError");

// 📧 EMAIL + PASSWORD LOGIN
loginBtn.addEventListener("click", () => {
  errorBox.textContent = "";

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Gmail-only validation
  if (!email.endsWith("@gmail.com")) {
    errorBox.textContent = "@gmail.com must be mentioned";
    return;
  }

  if (!password) {
    errorBox.textContent = "Password is required";
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(error => {
      errorBox.textContent = error.message;
    });
});

// 🔵 GOOGLE SIGN-IN
googleBtn.addEventListener("click", () => {
  errorBox.textContent = "";

  signInWithPopup(auth, provider)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(error => {
      // Ignore popup closed error
      if (error.code !== "auth/popup-closed-by-user") {
        errorBox.textContent = error.message;
      }
    });
});

// 🔁 AUTO LOGIN CHECK
onAuthStateChanged(auth, user => {
  if (user) {
    window.location.href = "dashboard.html";
  }
});
