import { signInWithEmailAndPassword, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { auth } from "./firebase.js";

/* ================= MATRIX BACKGROUND ================= */

const canvas = document.getElementById("matrixBackground");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();

const letters = "01";
const fontSize = 18;
let drops = [];

function init() {
  drops = Array(Math.floor(canvas.width / fontSize)).fill(1);
}
init();

function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff00";
  ctx.font = fontSize + "px monospace";

  drops.forEach((y, i) => {
    ctx.fillText(letters[Math.random() * 2 | 0], i * fontSize, y * fontSize);
    if (y * fontSize > canvas.height && Math.random() > 0.97) drops[i] = 0;
    drops[i]++;
  });
}
setInterval(draw, 40);

window.onresize = () => { resize(); init(); };

/* ================= LOGIN (FIREBASE) ================= */

const loginBtn = document.getElementById("loginBtn");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const loginError = document.getElementById("loginError");

const loginOverlay = document.getElementById("loginOverlay");
const welcomeOverlay = document.getElementById("welcomeOverlay");
const mainContent = document.getElementById("mainContent");

loginBtn.onclick = () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) {
    loginError.textContent = "Please enter email and password";
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      loginOverlay.style.display = "none";
      welcomeOverlay.style.display = "flex";
      loginError.textContent = "";
    })
    .catch(err => {
      loginError.textContent = err.message;
    });
};

/* ================= AUTO LOGIN CHECK ================= */

onAuthStateChanged(auth, user => {
  if (user) {
    loginOverlay.style.display = "none";
    welcomeOverlay.style.display = "flex";
    console.log("Logged in user:", user.email);
  }
});

/* ================= ENTER BUTTON ================= */

enterBtn.onclick = () => {
  welcomeOverlay.style.display = "none";
  mainContent.style.display = "block";
};

/* ================= TABS ================= */

document.querySelectorAll(".tabBtn").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".tabContent")
      .forEach(sec => sec.style.display = "none");
    document.getElementById(btn.dataset.target).style.display = "block";
  };
});
