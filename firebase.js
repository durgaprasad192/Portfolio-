// 🔥 Firebase CDN imports (REQUIRED for normal HTML + JS)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

// 🔐 Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdN1hP05wsatdgO9ybMDq6QIUTO3F85DA",
  authDomain: "portfolio-4dbe9.firebaseapp.com",
  projectId: "portfolio-4dbe9",
  storageBucket: "portfolio-4dbe9.appspot.com",
  messagingSenderId: "282140333264",
  appId: "1:282140333264:web:11f53d439f968d2e527ad5"
};

// 🚀 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔑 Initialize Authentication
export const auth = getAuth(app);

// ✅ Optional debug (you can remove later)
console.log("Firebase initialized successfully");
