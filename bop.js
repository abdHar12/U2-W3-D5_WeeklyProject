const params = new URLSearchParams(window.location.search);
const id = params.get("id");
console.log(id);

window.addEventListener("DOMContentLoaded", () => {
  const resetButton = document.createElement("button");
  const divButtonsDetail = document.querySelector("#buttons-detail");
  divButtonsDetail.appendChild(resetButton);
  resetButton.className = "btn btn-warning";
  resetButton.innerHTML = "Resetta i campi";
  resetButton.addEventListener("click", () => {
    const confirm = window.confirm(
      "Are you sure you want to reset all the fields?"
    );
    if (confirm) {
      const allInputFields = document.getElementsByClassName("form-control");
      Array.from(allInputFields).forEach((input) => {
        input.value = "";
      });
    }
  });

  const form = document.getElementsByTagName("form")[0];
  const method = id ? "PUT" : "POST";
  const button = document.querySelector("#confirm-details");
  console.log(button);
  if (id) {
    button.innerHTML = "Modifica";
  } else button.innerHTML = "Inserisci il prodotto";
  console.log(method);
  const url = id
    ? "https://striveschool-api.herokuapp.com/api/product/" + id
    : "https://striveschool-api.herokuapp.com/api/product";

  fetch("https://striveschool-api.herokuapp.com/api/product", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZWNhZjI1NGU4ODAwMTgzZjE4N2YiLCJpYXQiOjE2OTk2MDU2NzksImV4cCI6MTcwMDgxNTI3OX0.FpxzHckW_EHvRGVNLDMQyvpcup0LfrbS4UVXSD4XzZc"
    }
  })
    .then((res) => {
      if (res) {
        console.log(res);
        return res.json();
      } else throw new Error("Generic Fetching error");
    })
    .then((productsObj) => {
      productsObj.forEach((product) => {
        if (product._id === id) {
          const allInputFields =
            document.getElementsByClassName("form-control");
          Array.from(allInputFields).forEach((input) => {
            input.value = product[input.id];
          });
        }
      });
    })
    .catch((error) => console.log("CATCH BLOCK", error));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = {
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
      imageUrl: document.getElementById("imageUrl").value,
      brand: document.getElementById("brand").value,
      price: document.getElementById("price").value
    };

    fetch(url, {
      method,
      body: JSON.stringify(payload),
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZWNhZjI1NGU4ODAwMTgzZjE4N2YiLCJpYXQiOjE2OTk2MDU2NzksImV4cCI6MTcwMDgxNTI3OX0.FpxzHckW_EHvRGVNLDMQyvpcup0LfrbS4UVXSD4XzZc",
        "Content-Type": "application/json"
      }
    })
      .then((ans) => {
        if (ans) {
          console.log(ans);
          return ans.json();
        } else throw new Error("Generic Fetching error");
      })
      .then((productModifiedObj) => {
        const alert = document.getElementById("alert");
        if (id) {
          alert.innerText = `Risorsa ${productModifiedObj._id} modificata con successo`;
        } else {
          alert.innerText = `Risorsa ${productModifiedObj._id} creata con successo`;
        }
        alert.className = "alert alert-success";
        alert.style.display = "block";
        alert.style.position = "absolute";
        alert.style.width = "100%";
        setTimeout(() => {
          alert.style.display = "none";
        }, 3000);
      })
      .catch((error) => {
        console.log("CATCH BLOCK", error);
      });
  });
});
