<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const errorBox = document.getElementById("loginError");

document.getElementById("googleLoginBtn").addEventListener("click", () => {
  errorBox.textContent = ""; // 🔥 CLEAR ERROR FIRST

  signInWithPopup(auth, provider)
    .then((result) => {
      // ✅ LOGIN SUCCESS
      errorBox.textContent = ""; // 🔥 CLEAR ERROR
      document.getElementById("loginOverlay").style.display = "none";
      document.getElementById("mainContent").style.display = "block";
    })
    .catch((error) => {
      // ❌ IGNORE popup closed error
      if (error.code === "auth/popup-closed-by-user") {
        errorBox.textContent = "";
        return;
      }

      // ❌ REAL ERRORS ONLY
      errorBox.textContent = error.message;
    });
});
</script>
