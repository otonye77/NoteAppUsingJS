const formEl = document.querySelector(".form-container");
const nameInput = document.querySelector('input[type="text"]');
const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value
  }
  console.log(formData);
});
