// 🔥 FIREBASE IMPORTS
import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
  , GoogleAuthProvider, signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

// 🔗 CONNECT HTML ELEMENTS
const loginBtn = document.getElementById("loginBtn");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const loginOverlay = document.getElementById("loginOverlay");
const welcomeOverlay = document.getElementById("welcomeOverlay");
const mainContent = document.getElementById("mainContent");
const loginError = document.getElementById("loginError");
const enterBtn = document.getElementById("enterBtn");

// Google sign-in elements
const googleSignInBtn = document.getElementById('googleSignInBtn');


// 🎬 MATRIX BACKGROUND
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
    ctx.fillText(
      letters[Math.floor(Math.random() * letters.length)],
      i * fontSize,
      y * fontSize
    );
    if (y * fontSize > canvas.height && Math.random() > 0.97) {
      drops[i] = 0;
    }
    drops[i]++;
  });
}

setInterval(draw, 40);
window.onresize = () => {
  resize();
  init();
};

// 🔐 LOGIN LOGIC (STRICT @gmail.com CHECK)
loginBtn.onclick = async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  loginError.textContent = "";

  // STRICT Gmail-only regex
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  if (!email || !password) {
    loginError.textContent = "Please enter email and password";
    return;
  }

  if (!gmailRegex.test(email)) {
    loginError.textContent = "@gmail.com must be mentioned";
    return;
  }

  try {
    // Try login
    await signInWithEmailAndPassword(auth, email, password);
    loginOverlay.style.display = "none";
    welcomeOverlay.style.display = "flex";
  } catch (error) {
    try {
      // Auto-register new user
      await createUserWithEmailAndPassword(auth, email, password);
      loginOverlay.style.display = "none";
      welcomeOverlay.style.display = "flex";
    } catch (err) {
      loginError.textContent = err.message;
    }
  }
};

// 👉 ENTER BUTTON
enterBtn.onclick = () => {
  welcomeOverlay.style.display = "none";
  mainContent.style.display = "block";
};

// Google Sign-In handler using popup
const provider = new GoogleAuthProvider();
if (googleSignInBtn) {
  googleSignInBtn.addEventListener('click', async () => {
    loginError.textContent = '';
    try {
      await signInWithPopup(auth, provider);
      // successful sign-in
      loginOverlay.style.display = 'none';
      welcomeOverlay.style.display = 'flex';
    } catch (err) {
      console.error('Google sign-in error:', err);
      loginError.textContent = err.message || 'Google sign-in failed';
    }
  });
}

// 📌 TAB SWITCHING
document.querySelectorAll(".tabBtn").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".tabContent").forEach(sec => {
      sec.style.display = "none";
    });
    document.getElementById(btn.dataset.target).style.display = "block";
  };
});

// Open project links (hidden anchors) when a project list item is clicked
document.querySelectorAll('#projects li[data-link]').forEach(li => {
  li.style.cursor = 'pointer';
  li.addEventListener('click', () => {
    const anchorId = li.dataset.link;
    const a = document.getElementById(anchorId);
    if (a && a.href) {
      window.open(a.href, '_blank', 'noopener');
    } else {
      console.warn('Project link not set for', anchorId);
    }
  });
});

// Open contact links (hidden anchors) when a contact list item is clicked
document.querySelectorAll('#contact li[data-link]').forEach(li => {
  li.style.cursor = 'pointer';
  li.addEventListener('click', () => {
    const anchorId = li.dataset.link;
    const a = document.getElementById(anchorId);
    if (a && a.href) {
      // If it's a mailto: link, open in same window; otherwise new tab
      if (a.href.startsWith('mailto:')) {
        window.location.href = a.href;
      } else {
        window.open(a.href, '_blank', 'noopener');
      }
    } else {
      console.warn('Contact link not set for', anchorId);
    }
  });
});
