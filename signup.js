// Persist across steps
function getSignupData() {
  return JSON.parse(sessionStorage.getItem("signupData") || "{}");
}

// STEP 1: INITIATE SIGNUP
async function sendSignupEmailOtp() {
  const name  = $("signupName").value.trim();
  const email = $("signupEmail").value.trim();

  // Bug 2 fix: safe +91 handling
  const rawPhone = $("signupPhone").value.trim();
  const phone = rawPhone.startsWith("+91") ? rawPhone
              : rawPhone.startsWith("91") && rawPhone.length === 12 ? "+" + rawPhone
              : "+91" + rawPhone;

  if (!name || !email || !rawPhone) {
    showAlert("globalAlert", "error", "All fields are required");
    return;
  }

  const btn = document.querySelector("button[onclick='sendSignupEmailOtp()']");
  setBtnLoading(btn, true, "Sending OTP...");

  try {
    await API.signupInitiate(name, email, phone);

    // Bug 3 fix: use sessionStorage instead of a plain variable
    sessionStorage.setItem("signupData", JSON.stringify({ name, email, phone }));

    showAlert("globalAlert", "success", "OTP sent to " + email);

    // Bug 4 fix: use $() helper
    document.getElementById("emailOtpSection").classList.add("visible");

  } catch (err) {
    showAlert("globalAlert", "error", err.message);
  } finally {
    setBtnLoading(btn, false);
  }
}

// STEP 2: VERIFY EMAIL
async function verifySignupEmailOtp() {
  // Bug 3 fix: read from sessionStorage
  const signupData = getSignupData();
  if (!signupData.email) {
    showAlert("globalAlert", "error", "Session lost. Please start again.");
    return;
  }

  const otp = getOtp("emailOtpGroup");
  if (otp.length !== 6) {
    showAlert("globalAlert", "error", "Enter all 6 digits");
    return;
  }

  const btn = document.querySelector("button[onclick='verifySignupEmailOtp()']");
  setBtnLoading(btn, true, "Verifying...");

  try {
    await API.verifySignupEmail(signupData.email, otp);

    showAlert("globalAlert", "success", "Email verified! Check your SMS now.");

    // Bug 4 fix: use $() helper
    document.getElementById("phoneOtpSection").classList.add("visible");

  } catch (err) {
    showAlert("globalAlert", "error", err.message);
  } finally {
    setBtnLoading(btn, false);
  }
}

// STEP 3: VERIFY PHONE → CREATE ACCOUNT
async function verifySignupPhoneOtp() {
  // Bug 3 fix: read from sessionStorage
  const signupData = getSignupData();
  if (!signupData.phone) {
    showAlert("globalAlert", "error", "Session lost. Please start again.");
    return;
  }

  const otp = getOtp("phoneOtpGroup");
  if (otp.length !== 6) {
    showAlert("globalAlert", "error", "Enter all 6 digits");
    return;
  }

  const btn = document.querySelector("button[onclick='verifySignupPhoneOtp()']");
  setBtnLoading(btn, true, "Creating account...");

  try {
    await API.verifySignupPhone(signupData.phone, otp);

    // Clean up session storage
    sessionStorage.removeItem("signupData");

    showAlert("globalAlert", "success", "Account created! Redirecting...");

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);

  } catch (err) {
    showAlert("globalAlert", "error", err.message);
  } finally {
    setBtnLoading(btn, false);
  }
}

// Bug 1 fix: actually call setupOtpInputs
document.addEventListener("DOMContentLoaded", () => {
  setupOtpInputs("emailOtpGroup");
  setupOtpInputs("phoneOtpGroup");
});