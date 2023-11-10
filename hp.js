window.addEventListener("DOMContentLoaded", () => {
  const addNewProducts = document.getElementById("add-new-products");
  addNewProducts.setAttribute("href", "backOffice.html");
  addNewProducts.setAttribute("target", "_black");
  fetch("https://striveschool-api.herokuapp.com/api/product", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRkZWNhZjI1NGU4ODAwMTgzZjE4N2YiLCJpYXQiOjE2OTk2MDU2NzksImV4cCI6MTcwMDgxNTI3OX0.FpxzHckW_EHvRGVNLDMQyvpcup0LfrbS4UVXSD4XzZc"
    }
  })
    .then((res) => {
      if (res) return res.json();
      else throw new Error("Generic Fetching error");
    })
    .then((productsObj) => {
      const divRow = document.createElement("div");
      divRow.className = "row";

      const container = document.getElementById("container-all-products");
      container.appendChild(divRow);
      productsObj.forEach((product) => {
        const divCol = document.createElement("div");
        divCol.className = "col-6 col-md-4 col-lg-3 col-xl-2 mt-4";
        divRow.appendChild(divCol);
        const card = document.createElement("div");
        divCol.appendChild(card);
        card.className = "card";
        card.style.height = "400px";
        const imgCard = document.createElement("img");
        card.appendChild(imgCard);

        imgCard.setAttribute("src", product.imageUrl);
        imgCard.className = "h-50";
        imgCard.style.objectFit = "cover";
        const cardBody = document.createElement("div");
        cardBody.className =
          "card-body d-flex flex-column justify-content-between";
        card.appendChild(cardBody);
        const h5CardBody = document.createElement("h5");
        cardBody.appendChild(h5CardBody);
        h5CardBody.innerText = product.name;
        const pCardBody = document.createElement("div");
        pCardBody.className = " h-25 ellipsis";
        cardBody.appendChild(pCardBody);
        pCardBody.innerText = product.description;
        const buttonGoDetails = document.createElement("a");
        cardBody.appendChild(buttonGoDetails);
        buttonGoDetails.innerText = "Details";
        buttonGoDetails.className = "btn btn-primary";
        buttonGoDetails.setAttribute(
          "href",
          `./details.html?id=${product._id}`
        );
      });
    })
    .catch((error) => console.log("CATCH BLOCK", error));
});
