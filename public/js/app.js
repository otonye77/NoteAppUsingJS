const formEl = document.querySelector(".form-container");
const nameInput = document.querySelector('input[type="text"]');
const emailInput = document.querySelector('input[type="email"]');
const genderInput = document.querySelector("#genderInput");
const numberInput = document.querySelector('input[type="number"]');
const addressInput = document.querySelector("#addressInput");
const passwordInput = document.querySelector('input[type="password"]');

if (formEl) {
  formEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = {
      name: nameInput.value,
      email: emailInput.value,
      gender: genderInput.value,
      number: numberInput.value,
      address: addressInput.value,
      password: passwordInput.value,
    };
    try {
      const response = await fetch("http://localhost:7000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "http://localhost:7000/";
      }
    } catch (err) {
      throw new Error("Data cannot be created");
    }
  });
}

const notesFormEl = document.querySelector(".notesform");
const titleInputEl = document.querySelector(".titleInput");
const descriptionInputEl = document.querySelector(".descriptionInput");
const dateInputEl = document.querySelector(".dateInput");

notesFormEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const notesData = {
    title: titleInputEl.value,
    description: descriptionInputEl.value,
    date: dateInputEl.value,
    status: "pending",
  };
  try {
    const response = await fetch("http://localhost:7000/users/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(notesData),
    });
    const data = await response.json();
    console.log(data);
  } catch (err) {
    throw new Error("Failed to complete");
  }
});


