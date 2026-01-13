// 🔥 FIREBASE
import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

// 🔗 ELEMENTS
const loginBtn = document.getElementById("loginBtn");
const googleLoginBtn = document.getElementById("googleLoginBtn");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const loginOverlay = document.getElementById("loginOverlay");
const welcomeOverlay = document.getElementById("welcomeOverlay");
const mainContent = document.getElementById("mainContent");
const loginError = document.getElementById("loginError");
const enterBtn = document.getElementById("enterBtn");

// 📧 GMAIL VALIDATION
function isValidGmail(email) {
  return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
}

// 🔐 EMAIL / PASSWORD LOGIN
loginBtn.onclick = async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  loginError.textContent = "";

  if (!email || !password) {
    loginError.textContent = "Email and password required";
    return;
  }

  if (!isValidGmail(email)) {
    loginError.textContent = "Email must end with @gmail.com";
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    loginOverlay.style.display = "none";
    welcomeOverlay.style.display = "flex";
  } catch {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      loginOverlay.style.display = "none";
      welcomeOverlay.style.display = "flex";
    } catch (err) {
      loginError.textContent = err.message;
    }
  }
};

// 🔑 GOOGLE LOGIN
const provider = new GoogleAuthProvider();

googleLoginBtn.onclick = async () => {
  try {
    await signInWithPopup(auth, provider);
    loginOverlay.style.display = "none";
    welcomeOverlay.style.display = "flex";
  } catch (err) {
    loginError.textContent = err.message;
  }
};

// 👉 ENTER
enterBtn.onclick = () => {
  welcomeOverlay.style.display = "none";
  mainContent.style.display = "block";
};

// 📌 TABS
document.querySelectorAll(".tabBtn").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".tabContent").forEach(sec => sec.style.display = "none");
    document.getElementById(btn.dataset.target).style.display = "block";
  };
});
