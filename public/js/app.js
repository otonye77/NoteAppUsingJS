const formEl = document.querySelector(".form-container");
const nameInput = document.querySelector('input[type="text"]');
const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');

formEl.addEventListener("submit", async(e) => {
  e.preventDefault();
  const formData = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value
  }
  try {
    const response = await fetch("http://localhost:7000/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    const data = await response.json();
    console.log(data);
  } catch (err) {
    throw new Error("Data cannot be created")
  }
});
