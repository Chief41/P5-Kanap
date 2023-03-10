// Je récupère mon panier en storage
let panier = JSON.parse(localStorage.getItem("myCart"));
let totalQuantity = 0;
console.log(panier); //test
// Chaque canapés du panier je récupère l'ID et je l'utilise pour faire un fetch.

if (panier == null) {
  alert("Le panier est vide");
} else {
  if (panier.length == 0) {
    alert("Le panier est vide");
  } else {
    for (let i = 0; i < panier.length; i++) {
      totalQuantity += Number(panier[i].quantity); // boucle qui permet d'avoir le total de canapés entre paranthèse
      fetch("http://localhost:3000/api/products/" + panier[i].id)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          //Afficher le canapé dans le panier.
          console.log(data);

          let myNewArticle = document.createElement("article");
          myNewArticle.classList.add("cart__item");
          myNewArticle.setAttribute("data-id", data._id);
          myNewArticle.setAttribute("data-color", panier[i].color);
          let mySection = document.querySelector("#cart__items");
          mySection.appendChild(myNewArticle);

          let myImgArticle = document.createElement("div");
          myImgArticle.classList.add("cart__item__img");
          myImg = document.createElement("img");
          myImg.src = data.imageUrl;
          myImg.alt = data.altTxt;
          myImgArticle.appendChild(myImg);
          myNewArticle.appendChild(myImgArticle);

          let myPanierDescription = document.createElement("div");
          myPanierDescription.classList.add("cart__item__content");
          myNewArticle.appendChild(myPanierDescription);

          let imgDescription = document.createElement("div");
          imgDescription.classList.add("cart__item__content__description");
          myPanierDescription.appendChild(imgDescription);
          //imgDescription.textContent = data.description;
          //console.log(data.description);

          let panierTitle = document.createElement("h2");
          panierTitle.textContent = data.name;
          imgDescription.appendChild(panierTitle);

          let colorDeKanap = document.createElement("p");
          colorDeKanap.textContent = panier[i].color;
          imgDescription.appendChild(colorDeKanap);

          let priceKanap = document.createElement("p");
          priceKanap.textContent = data.price;
          imgDescription.appendChild(priceKanap);

          let containerQty = document.createElement("div");
          containerQty.classList.add("cart__item__content__settings");
          myPanierDescription.appendChild(containerQty);

          let qtyDescription = document.createElement("div");
          qtyDescription.classList.add(
            "cart__item__content__settings__quantity"
          );
          containerQty.appendChild(qtyDescription);
          let realQty = document.createElement("p");
          qtyDescription.appendChild(realQty);
          realQty.textContent = "Qté :";

          let myInput = document.createElement("input");
          myInput.classList.add("itemQuantity");
          qtyDescription.appendChild(myInput);
          myInput.setAttribute("type", "number");
          myInput.setAttribute("name", "itemQuantity");
          myInput.setAttribute("min", 1);
          myInput.setAttribute("max", 100);
          myInput.setAttribute("value", panier[i].quantity);

          myInput.addEventListener("change", () => {
            let article = buttonDelete.closest("article");
            let id = article.dataset.id;
            let color = article.dataset.color;
            let panier = JSON.parse(localStorage.getItem("myCart"));
            for (j = 0; j < panier.length; j++) {
              if (id == panier[j].id && color == panier[j].color) {
                panier[j].quantity = myInput.value;
                localStorage.setItem("myCart", JSON.stringify(panier));
                location.reload();
              }
            }
            console.log("modifier " + color + id);
          });

          //let totalQty = document.querySelector('#totalQuantity');
          //totalQty.textContent = totalQuantity;

          let totalPrice = document.querySelector("#totalPrice");
          totalPrice.textContent =
            Number(totalPrice.textContent) + data.price * panier[i].quantity;

          let containerDelete = document.createElement("div");
          containerDelete.classList.add(
            "cart__item__content__settings__delete"
          );
          containerQty.appendChild(containerDelete);
          let buttonDelete = document.createElement("p");
          buttonDelete.classList.add("deleteItem");
          buttonDelete.textContent = "Supprimer";
          containerDelete.appendChild(buttonDelete);

          buttonDelete.addEventListener("click", () => {
            let article = buttonDelete.closest("article");
            let id = article.dataset.id;
            let color = article.dataset.color;
            let bonCanap = panier.findIndex(
              (element) => element.id === id && element.color === color
            );

            let indexOfArticleInCart = panier.indexOf(bonCanap);
            panier.splice(indexOfArticleInCart);
            localStorage.setItem("myCart", JSON.stringify(panier));
            panier = JSON.parse(localStorage.getItem("myCart"));
            article.remove();
            window.location.reload(); //Rafraichir la page correctement
          });
        });
      let totalQty = document.querySelector("#totalQuantity");
      totalQty.textContent = Number(totalQuantity);
    }
  }
}

// Mon formulaire

let form = document.querySelector(".cart__order__form");
let myRegex = new RegExp("^[a-zA-Z-àâäéèêëïîôöùûüç ,.'-]+$");
let addressRegExp = new RegExp(
  "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
);
let emailReg = new RegExp(
  /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/i
); // Ce code signifie les carractères que j'ai le droit d'utiliser pour mon email

const getForm = () => {
  form.firstName.addEventListener("change", function () {
    //Ecoute de firstName
    validFirstName(this);
  });

  const validFirstName = function (inputFirstName) {
    // Validation de firstName
    // let myName = document.querySelector("#firstName");
    let firstNameErrorMsg = inputFirstName.nextElementSibling;
    if (myRegex.test(inputFirstName.value)) {
      firstNameErrorMsg.textContent = "";
    } else {
      firstNameErrorMsg.textContent = "Erreur";
    }
  };

  form.lastName.addEventListener("change", function () {
    validLastName(this);
  });

  const validLastName = function (inputLastName) {
    // let myLastName = document.querySelector("#lastName");
    let lastNameErrorMsg = inputLastName.nextElementSibling;
    if (myRegex.test(inputLastName.value)) {
      lastNameErrorMsg.textContent = "";
    } else {
      lastNameErrorMsg.textContent = "Erreur";
    }
  };

  form.address.addEventListener("change", function () {
    validAddressName(this);
  });

  const validAddressName = function (inputAddressName) {
    //let myAddress = document.querySelector("#address");
    let addressErrorMsg = inputAddressName.nextElementSibling;
    if (addressRegExp.test(inputAddressName.value)) {
      addressErrorMsg.textContent = "";
    } else {
      addressErrorMsg.textContent = "Erreur";
    }
  };

  form.city.addEventListener("change", function () {
    validCityName(this);
  });

  const validCityName = function (inputCityName) {
    // let myCity = document.querySelector("#city");
    let cityErrorMsg = inputCityName.nextElementSibling;
    if (myRegex.test(inputCityName.value)) {
      cityErrorMsg.textContent = "";
    } else {
      cityErrorMsg.textContent = "Erreur";
    }
  };

  form.email.addEventListener("change", function () {
    validEmail(this);
  });

  // Création de ma reg exp pour valider mon email
  const validEmail = function (inputEmail) {
    let errorEmailMsg = inputEmail.nextElementSibling;

    if (emailReg.test(inputEmail.value)) {
      errorEmailMsg.textContent = "";
      //Ici le if/else signifie que si mon adresse email est bonne alors elle doit s'afficher en console.
    } else {
      errorEmailMsg.textContent = "Erreur";
    }
  };
};
getForm();

function postForm() {
  let myButtonSend = document.querySelector("#order");
  let inputFirstName = document.querySelector("#firstName");
  let inputLastName = document.querySelector("#lastName");
  let inputAddressName = document.querySelector("#address");
  let inputCityName = document.querySelector("#city");
  let inputEmail = document.querySelector("#email");
  let panier = JSON.parse(localStorage.getItem("myCart")); 

  myButtonSend.addEventListener("click", (e) => {
    
    e.preventDefault();
    if (
      !emailReg.test(inputEmail.value)||
      !myRegex.test(inputCityName.value)||
      !addressRegExp.test(inputAddressName.value)||
      !myRegex.test(inputLastName.value)||
      !myRegex.test(inputFirstName.value)
    ) {
      alert("Merci de bien renseigner le formulaire en entier");
      e.preventDefault();
    }
  else {
      let identite = [];
      for (let i = 0; i < panier.length; i++) {
        identite.push(panier[i].id);
      };
  
      const identiteCommande = {
        contact: {
          firstName: inputFirstName.value,
          lastName: inputLastName.value,
          address: inputAddressName.value,
          city: inputCityName.value,
          email: inputEmail.value,
        },

        products: identite,
      };

      const option = {
        method: "POST",
        body: JSON.stringify(identiteCommande),
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch("http://localhost:3000/api/products/order", option)
        .then((res) => res.json())
        .then((data) => {
          localStorage.clear();
          localStorage.setItem("orderId", data.orderId);
          document.location.href = "confirmation.html?orderId=" + data.orderId;
        });
    }
  });
}
postForm();
