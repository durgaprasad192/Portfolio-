import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBdN1hP05wsatdgO9ybMDq6QIUTO3F85DA",
  authDomain: "portfolio-4dbe9.firebaseapp.com",
  projectId: "portfolio-4dbe9",
  storageBucket: "portfolio-4dbe9.firebasestorage.app",
  messagingSenderId: "282140333264",
  appId: "1:282140333264:web:11f53d439f968d2e527ad5"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

console.log("Firebase connected successfully");
