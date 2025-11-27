// main.js
import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const msg = document.getElementById("msg");

// ---- FORCE CLEAR ALL FIELDS (override autofill) ----
function clearAllFields() {
  if (!nameInput || !emailInput || !passwordInput) return;

  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
}

// run several times after load to beat autofill
window.addEventListener("load", () => {
  clearAllFields();
  setTimeout(clearAllFields, 100);
  setTimeout(clearAllFields, 400);
  setTimeout(clearAllFields, 1000);
});

// ----------------- REGISTER -----------------
registerBtn.addEventListener("click", async () => {
  msg.textContent = "";

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!name) {
    msg.textContent = "Please enter your full name.";
    return;
  }
  if (!email || !password) {
    msg.textContent = "Please enter email and password.";
    return;
  }

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    await sendEmailVerification(userCred.user);

    await setDoc(doc(db, "users", userCred.user.uid), {
      name,
      email,
      createdAt: new Date().toISOString()
    });

    msg.textContent = "✅ Verification email sent! Please check your inbox.";

    clearAllFields();
  } catch (error) {
    console.error(error);
    msg.textContent = error.message;
  }
});


loginBtn.addEventListener("click", async () => {
  msg.textContent = "";

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    msg.textContent = "Please enter email and password.";
    return;
  }

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);

    if (!userCred.user.emailVerified) {
      msg.textContent = "⚠️ Please verify your email first before logging in.";
      return;
    }

    // DAPAT ING-ANI LANG
    window.location = "dashboard.html";

  } catch (error) {
    console.error(error);
    msg.textContent = error.message;
  }
});

