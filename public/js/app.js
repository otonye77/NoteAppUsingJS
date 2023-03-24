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

if (notesFormEl) {
  notesFormEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const notesData = {
      title: titleInputEl.value,
      description: descriptionInputEl.value,
      date: dateInputEl.value,
      status: "pending",
    };
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:7000/users/create", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(notesData),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      throw new Error("Failed to complete");
    }
  });
}

const viewcontainerEl = document.querySelector(".viewnotescontainer");
if (viewcontainerEl) {
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:7000/users/notes");
      const result = await response.json();
      return result.data;
    } catch (error) {
      document.body.innerHTML = "SORRY PAGE NOT FOUND";
      throw new Error("Failed to get data");
    }
  };

  const main = async () => {
    const data = await getData();
    viewcontainerEl.innerHTML = "";
    const list = document.createElement("ul");
    data.map(({ id, title, description, status, date }) => {
      const notes = `
    <div class="details">
    <h2 class="starwars">${title}</h2>
    <h3 class="starwars">${description}</h3>
    <h4 class="starwars">${status}</h4>
    <h5 class="starwars">${date}</h5>
    <button id="btn" class="btn">Delete</button>
    <button id="updatebtn" class="updatebtn">Update</button>
  </div>
    `;
      const item = document.createElement("li");
      item.classList.add("item");
      item.innerHTML = notes;
      const btn = item.querySelector(".btn");
      const updatebtn = item.querySelector(".updatebtn");
      const token = localStorage.getItem("token");
      btn.addEventListener("click", async () => {
        try {
          const response = await fetch(
            `http://localhost:7000/users/delete/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const result = await response.json();
          if (result.message) {
            window.location.reload();
          }
        } catch (err) {
          console.log(err);
        }
      });
      updatebtn.addEventListener("click", async () => {
        const noteId = id;
        const updatedTitle = prompt("Enter updated title");
        const updatedDescription = prompt("Enter updated description");
        const updatedDate = prompt("Enter updated date");

        const updatedData = {
          title: updatedTitle,
          description: updatedDescription,
          date: updatedDate,
        };
        const token = localStorage.getItem("token");
        try {
          const response = await fetch(
            `http://localhost:7000/users/update/${noteId}`,
            {
              method: "PUT",
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(updatedData),
            }
          );
          const result = await response.json();
          if (result.message) {
            window.location.reload();
          }
        } catch (err) {
          console.log(err);
        }
      });
      list.appendChild(item);
    });
    viewcontainerEl.append(list);
  };
  main();
}
