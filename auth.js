// SWITCH METHOD (EMAIL / PHONE)
function switchMethod(type) {

  document.getElementById("emailMethod").style.display =
    type === "email" ? "block" : "none";

  document.getElementById("phoneMethod").style.display =
    type === "phone" ? "block" : "none";

  document.getElementById("tabEmail").classList.toggle("active", type === "email");
  document.getElementById("tabPhone").classList.toggle("active", type === "phone");
}

// ───────── EMAIL LOGIN ─────────
async function sendLoginEmailOtp() {

  const email = document.getElementById("loginEmail").value;
  const btn = document.getElementById("btnSendEmailOtp");

  if (!email) {
    showAlert("globalAlert", "error", "Enter email");
    return;
  }

  try {
    setBtnLoading(btn, true, "Sending...");

    await API.sendEmailOtp(email);

    localStorage.setItem("loginEmail", email);
    showAlert("globalAlert", "success", "OTP sent to email");

    document.getElementById("emailOtpWrapper").classList.add("open");
    document.getElementById("emailSentTo").innerText = email;

  } catch (err) {
    showAlert("globalAlert", "error", err.message);
  } finally {
    setBtnLoading(btn, false);
  }
}
/*
async function verifyLoginEmailOtp() {

  const email = document.getElementById("loginEmail").value;
  const otp = getOtp("emailOtpGroup");

  const btn = document.getElementById("btnVerifyEmailOtp");

  if (otp.length !== 6) {
    showAlert("globalAlert", "error", "Enter full OTP");
    return;
  }

  try {
    setBtnLoading(btn, true, "Verifying...");

    const res = await API.verifyEmailOtp(email, otp);

    localStorage.setItem("token", res.sessionToken);

    showSuccess("Login successful");

  } catch (err) {
    showAlert("globalAlert", "error", err.message);
  } finally {
    setBtnLoading(btn, false);
  }
}


async function verifyLoginEmailOtp() {

  const email = localStorage.getItem("loginEmail");
  const otp = getOtp("emailOtpGroup");

  const btn = document.getElementById("btnVerifyEmailOtp");

  if (otp.length !== 6) {
    showAlert("globalAlert", "error", "Enter full OTP");
    return;
  }

  try {
    setBtnLoading(btn, true, "Verifying...");

    const res = await API.verifyEmailOtp(email, otp);

    // ✅ store token
    localStorage.setItem("token", res.sessionToken);

    // ✅ optional: store user if backend sends
    if (res.user) {
      localStorage.setItem("user", JSON.stringify(res.user));
    }

    // ✅ redirect to dashboard
    window.location.replace = ("dashboard.html");

  } catch (err) {
    showAlert("globalAlert", "error", err.message);
  } finally {
    setBtnLoading(btn, false);
  }
}*/


/*
async function verifyLoginPhoneOtp() {

  const phone = localStorage.getItem("loginPhone");
  const otp = getOtp("phoneOtpGroup");

  const btn = document.getElementById("btnVerifyPhoneOtp");

  if (otp.length !== 6) {
    showAlert("globalAlert", "error", "Enter full OTP");
    return;
  }

  try {
    setBtnLoading(btn, true, "Verifying...");

    const res = await API.verifyPhoneOtp(phone, otp);

    console.log("PHONE LOGIN SUCCESS:", res); // 🧪 debug

    localStorage.setItem("token", res.sessionToken);

    // ✅ FORCE REDIRECT
    setTimeout(() => {
      window.location.replace("dashboard.html");
    }, 100);

  } catch (err) {
    console.error("PHONE LOGIN ERROR:", err);
    showAlert("globalAlert", "error", err.message);
  } finally {
    setBtnLoading(btn, false);
  }
}
*/



async function verifyLoginPhoneOtp() {

  const phone = localStorage.getItem("loginPhone");

  console.log("VERIFY PHONE:", phone); // DEBUG

  if (!phone) {
    showAlert("globalAlert", "error", "Please request OTP first");
    return;
  }

  const otp = getOtp("phoneOtpGroup");

  if (otp.length !== 6) {
    showAlert("globalAlert", "error", "Enter full OTP");
    return;
  }

  try {
    const res = await API.verifyPhoneOtp(phone, otp);

    localStorage.setItem("token", res.sessionToken);

    window.location.replace("dashboard.html");

  } catch (err) {
    showAlert("globalAlert", "error", err.message);
  }
}

// ───────── PHONE LOGIN ─────────
/*async function sendLoginPhoneOtp() {

  const phone = document.getElementById("loginPhone").value;
  const btn = document.getElementById("btnSendPhoneOtp");

  if (!phone) {
    showAlert("globalAlert", "error", "Enter phone");
    return;
  }

  try {
    setBtnLoading(btn, true, "Sending...");

    await API.sendPhoneOtp(phone);

    showAlert("globalAlert", "success", "OTP sent to phone");

    document.getElementById("phoneOtpWrapper").classList.add("open");
    document.getElementById("phoneSentTo").innerText = phone;

  } catch (err) {
    showAlert("globalAlert", "error", err.message);
  } finally {
    setBtnLoading(btn, false);
  }
}*/


async function sendLoginPhoneOtp() {

  let phone = document.getElementById("loginPhone").value.trim();
  const btn = document.getElementById("btnSendPhoneOtp");

  if (!phone) {
    showAlert("globalAlert", "error", "Enter phone");
    return;
  }

  // ✅ FIX: normalize phone to +91
  if (!phone.startsWith("+91")) {
    phone = "+91" + phone;
  }

  try {
    setBtnLoading(btn, true, "Sending...");

    await API.sendPhoneOtp(phone);

    showAlert("globalAlert", "success", "OTP sent to " + phone);

    // ✅ show OTP section
    document.getElementById("phoneOtpWrapper").classList.add("open");

    // ✅ show number in UI
    document.getElementById("phoneSentTo").innerText = phone;

    // ✅ store phone for later verification (IMPORTANT)
    localStorage.setItem("loginPhone", phone);

  } catch (err) {
    showAlert("globalAlert", "error", err.message);
  } finally {
    setBtnLoading(btn, false);
  }
}

/*async function verifyLoginPhoneOtp() {

  const phone = document.getElementById("loginPhone").value;
  const otp = getOtp("phoneOtpGroup");

  const btn = document.getElementById("btnVerifyPhoneOtp");

  if (otp.length !== 6) {
    showAlert("globalAlert", "error", "Enter full OTP");
    return;
  }

  try {
    setBtnLoading(btn, true, "Verifying...");

    const res = await API.verifyPhoneOtp(phone, otp);

    localStorage.setItem("token", res.sessionToken);

    showSuccess("Login successful");

  } catch (err) {
    showAlert("globalAlert", "error", err.message);
  } finally {
    setBtnLoading(btn, false);
  }
}

async function verifyLoginPhoneOtp() {

  const phone = localStorage.getItem("loginPhone"); // ✅ use stored value
  const otp = getOtp("phoneOtpGroup");

  const btn = document.getElementById("btnVerifyPhoneOtp");

  if (otp.length !== 6) {
    showAlert("globalAlert", "error", "Enter full OTP");
    return;
  }

  try {
    setBtnLoading(btn, true, "Verifying...");

    const res = await API.verifyPhoneOtp(phone, otp);

    // ✅ store token
    localStorage.setItem("token", res.sessionToken);

    // ✅ redirect
    window.location.href = ("dashboard.html");

  } catch (err) {
    showAlert("globalAlert", "error", err.message);
  } finally {
    setBtnLoading(btn, false);
  }
}*/


async function verifyLoginEmailOtp() {

  const email = localStorage.getItem("loginEmail"); // ✅ FIX
  const otp = getOtp("emailOtpGroup");

  const btn = document.getElementById("btnVerifyEmailOtp");

  if (otp.length !== 6) {
    showAlert("globalAlert", "error", "Enter full OTP");
    return;
  }

  try {
    setBtnLoading(btn, true, "Verifying...");

    const res = await API.verifyEmailOtp(email, otp);

    console.log("EMAIL LOGIN SUCCESS:", res); // 🧪 debug

    localStorage.setItem("token", res.sessionToken);

    // ✅ FORCE REDIRECT
    setTimeout(() => {
      window.location.replace("dashboard.html");
    }, 100);

  } catch (err) {
    console.error("EMAIL LOGIN ERROR:", err);
    showAlert("globalAlert", "error", err.message);
  } finally {
    setBtnLoading(btn, false);
  }
}



// ───────── SUCCESS UI ─────────
function showSuccess(msg) {

  document.getElementById("pageLogin").classList.remove("active");
  document.getElementById("pageSuccess").classList.add("active");

  document.getElementById("successMsg").innerText = msg;
}
document.addEventListener("DOMContentLoaded", () => {

  setupOtpInputs("emailOtpGroup");
  setupOtpInputs("phoneOtpGroup");
  setupOtpInputs("signupEmailOtpGroup");
  setupOtpInputs("signupPhoneOtpGroup");

});


async function createAccountEmail() {

  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const phone = document.getElementById("signupPhone").value.trim();

  if (!name || !email || !phone) {
    showAlert("globalAlert", "error", "All fields required");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/signup/complete`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ name, email, phone })
    });

    const data = await res.json();

    showSuccess("Account created successfully 🎉");

  } catch (err) {
    showAlert("globalAlert", "error", "Failed to create account");
  }
}

function showPage(pageId) {

  // hide all pages
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  // show selected page
  document.getElementById(pageId).classList.add("active");

}