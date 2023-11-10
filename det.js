const params = new URLSearchParams(window.location.search);
const id = params.get("id");
console.log(id);
const url = "https://striveschool-api.herokuapp.com/api/product";
window.addEventListener("DOMContentLoaded", () => {
  fetch(url, {
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
        console.log(productsObj);

        console.log(product._id === id);
        if (product._id === id) {
          const allInformationsSpan =
            document.getElementsByClassName("information");
          console.log(allInformationsSpan);
          Array.from(allInformationsSpan).forEach((information) => {
            information.classList.add("ellipsis");
            information.innerHTML = product[information.id];
            console.log(information.id);
          });
          const modifyButton = document.getElementById("button-to-modify");
          modifyButton.setAttribute("href", `./backOffice.html?id=${id}`);
          const deleteButton = document.getElementById("button-to-delete");
          deleteButton.addEventListener("click", () => {
            const confirm = window.confirm(
              "Are you sure you want to delete this? The Item will be irrecoverable"
            );
            if (confirm) {
              fetch(url + `/${id}`, {
                method: "DELETE",
                headers: {
                  Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZWNhZjI1NGU4ODAwMTgzZjE4N2YiLCJpYXQiOjE2OTk2MDU2NzksImV4cCI6MTcwMDgxNTI3OX0.FpxzHckW_EHvRGVNLDMQyvpcup0LfrbS4UVXSD4XzZc"
                }
              })
                .then((ans) => {
                  if (ans) {
                    console.log(ans);
                    return ans.json();
                  } else throw new Error("Generic Fetching error");
                })
                .then((productDeletedObj) => {
                  const alert = document.getElementById("alert");
                  alert.innerText = `Risorsa ${productDeletedObj._id} è stata eliminata con successo`;
                  alert.className = "alert alert-danger";
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
            }
          });
        }
      });
    })
    .catch((error) => console.log("CATCH BLOCK", error));
});
