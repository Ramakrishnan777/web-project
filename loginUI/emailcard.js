document.addEventListener("DOMContentLoaded", () => {
//email validation
  const email = document.getElementById("email");
  const emailhelper = document.getElementById("emailhelper");
  const getotpbtn = document.getElementById("getotpbtn");

  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  getotpbtn.disabled = true;

  email.addEventListener("input", () => {
    if (emailregex.test(email.value)) {
      emailhelper.textContent = "We’ll send a one-time password to this email";
      emailhelper.style.color = "#777";
      getotpbtn.disabled = false;
    } else {
      emailhelper.textContent = "Invalid Email";
      emailhelper.style.color = "red";
      getotpbtn.disabled = true;
    }
  });

});
