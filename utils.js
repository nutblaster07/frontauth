// DOM helpers
const $ = (id) => document.getElementById(id);

// ALERT
function showAlert(id, type, msg) {
  const el = $(id);
  el.innerText = msg;
  el.style.color = type === "success" ? "green" : "red";
}

// BUTTON LOADING
function setBtnLoading(btn, loading, text = "Loading...") {
  if (loading) {
    btn.disabled = true;
    btn.dataset.original = btn.innerText;
    btn.innerText = text;
  } else {
    btn.disabled = false;
    btn.innerText = btn.dataset.original;
  }
}

// OTP HELPERS
function getOtp(groupId) {
  return [...document.querySelectorAll(`#${groupId} .otp-input`)]
    .map(i => i.value)
    .join("");
}

function setupOtpInputs(groupId) {

  const inputs = document.querySelectorAll(`#${groupId} .otp-input`);

  inputs.forEach((input, index) => {

    input.addEventListener("input", (e) => {

      // allow only digits
      input.value = input.value.replace(/[^0-9]/g, "");

      if (input.value.length === 1 && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (e) => {

      if (e.key === "Backspace" && !input.value && index > 0) {
        inputs[index - 1].focus();
      }
    });

  });
}

