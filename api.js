const BASE_URL = "https://auth2-x9xb.onrender.com/api/auth";

const API = {
  sendEmailOtp: (email) =>
    post("/login/email/request", { target: email }),

  verifyEmailOtp: (email, otp) =>
    post("/login/email/verify", { target: email, otp }),

  sendPhoneOtp: (phone) =>
    post("/login/phone/request", { target: phone }),

  verifyPhoneOtp: (phone, otp) =>
    post("/login/phone/verify", { target: phone, otp }),

  signupInitiate: (name, email, phone) =>
  post("/signup/initiate", { name, email, phone }),

verifySignupEmail: (email, otp) =>
  post("/signup/verify-email", { target: email, otp }),

verifySignupPhone: (phone, otp) =>
  post("/signup/verify-phone", { target: phone, otp }),
};

async function post(path, body) {
  const res = await fetch(BASE_URL + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

