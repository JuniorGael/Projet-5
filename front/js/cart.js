let getData = JSON.parse(localStorage.getItem("data") || "[]");

const cartItems = document.getElementById("cart__items");

let basket = [];

const totalPrice = document.querySelector("#totalPrice");
totalPrice.innerHTML = "0";

const totalQuantity = document.querySelector("#totalQuantity");
totalQuantity.innerHTML = "0";





async function fetchCart() {
    return await fetch(`http://localhost:3000/api/products`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        return data;
    });
}

function displayProductInCart(basket) {
    for(let i = 0; i < basket.length; i++) {
        // =========== creer la balise "article" ===================
        const articleCart = document.createElement("article");
        // console.log(articleCart);
        // ajouter une classe a la balise "article"
        articleCart.classList.add("cart__item");
        // ajouter une data-id
        articleCart.setAttribute("data-id", basket[i]._id);
        // ajouter une data-color
        articleCart.setAttribute("data-color", basket[i].color);
        // =============================================================

        // creer une image div =====================================
        const divCart = document.createElement("div");
        // ajouter une classe a la balise "div"
        divCart.classList.add("cart__item__img");
        // creer une image
        const image = document.createElement("img");
        // ajouter une source de l'image
        image.src = basket[i].imageUrl;
        // ajouter l'element "alt"
        image.alt = basket[i].altTxt;
        // 
        divCart.appendChild(image);
        // 
        articleCart.appendChild(divCart);
        // ====================================================

        // creer un contenu div =============================
        const divCart1 = document.createElement("div");
        // ajouter une classe a la balise "div"
        divCart1.classList.add("cart__item__content");
        // 
        articleCart.appendChild(divCart1);
        // ==================================================

        // creer un contenu descriptif
        const divCart2 = document.createElement("div");
        // ajouter une classe a la balise "div"
        divCart2.classList.add("cart__item__content__description");
        // creer la balise h2
        const name = document.createElement("h2");
        // nom de la balise h2
        name.innerHTML = basket[i].name;
        // 
        divCart2.appendChild(name);

        // creer la balise p ==============================
        const nameColor = document.createElement("p");
        // nom de la balise p
        nameColor.innerHTML = basket[i].color;
        // 
        divCart2.appendChild(nameColor);

        // creer la balise p
        const nameprice = document.createElement("p");
        // nom de la balise p
        nameprice.innerHTML = basket[i].price + " €";
        // 
        divCart2.appendChild(nameprice);

        // 
        divCart1.appendChild(divCart2);
        // ===============================================

        // creer un parametre du contenu ==================
        const divCart3 = document.createElement("div");
        // ajouter une classe a la balise "div"
        divCart3.classList.add("cart__item__content__settings");
        // 
        divCart1.appendChild(divCart3);
        // =================================================

        // =================================================
        const divCart4 = document.createElement("div");
        // ajouter une classe a la balise "div"
        divCart4.classList.add("cart__item__content__settings__quantity");
        // 
        divCart3.appendChild(divCart4);
        // 
        const qte = document.createElement("p");
        // nom de la balise p
        qte.innerHTML = `Qte : `;
        // 
        divCart4.appendChild(qte);
        // 
        const input = document.createElement("input");
        input.setAttribute("type", "number");
        input.classList.add("itemQuantity");
        input.setAttribute("name", "itemQuantity");
        input.setAttribute("min", "1");
        input.setAttribute("max", "100");
        input.setAttribute("value", basket[i].quantity);
        divCart4.appendChild(input);
        // =================================================

        // ===============================================
        const divCart5 = document.createElement("div");
        // ajouter une classe a la balise "div"
        divCart5.classList.add("cart__item__content__settings__delete");
        const dlt = document.createElement("p");
        dlt.classList.add("deleteItem")
        dlt.textContent = "Supprimer";
        divCart5.appendChild(dlt);
        // 
        divCart3.appendChild(divCart5);
        // =============================================
        cartItems.appendChild(articleCart);

        totalPrice.innerHTML = calcTotalPrice();

        totalQuantity.innerHTML = calcTotalQuantity();
    }
}

// ====== Calcul de la quantite totale des produits enregistres dans le panier ========================
// declaration de la variable pour y mettre les quantites qui sont presents dans le panier
// const qteTotalCalc = [];
function calcTotalQuantity() {
    let total = 0;
    for(let i = 0; i < getData.length; i++) {
        total += Number(getData[i].quantity);
    }
    return total.toString();
}

// =============== Calcul du prix total des produits enregistres dans le panier =========================
// declaration de la variable pour y mettre les prix qui sont presents dans le panier
function calcTotalPrice() {
    let total = 0;
    for( let i = 0; i < basket.length; i++) {
        total += Number(basket[i].price) * Number(getData[i].quantity);
    }
    return total.toString();
}

// ===== Modifier la quantite d'un article enregistree dans le panier ========================
function modifyQty() {
    const itemQty = document.querySelectorAll(".itemQuantity");
    
    for(let i = 0; i < getData.length; i++) {
        itemQty[i].addEventListener("change", (e) => {
            e.preventDefault();

            getData[i].quantity = Number(itemQty[i].value);

            localStorage.setItem("data", JSON.stringify(getData));

            totalQuantity.innerHTML = calcTotalQuantity();
            totalPrice.innerHTML = calcTotalPrice();
        })
    }
}

function removeProductFromBasket() {
    const dltItem = document.querySelectorAll(".deleteItem");
    
    for(let i = 0; i < getData.length; i++) {
        dltItem[i].addEventListener("click", (e) => {
            e.preventDefault();

            const selectedItem = Array.from(cartItems.children).find(child => child.contains(e.target) || child === e.target);

            selectedItem.remove();

            getData.splice(i, 1);
            
            // envoyer dans le localStorage pour supprimer le produit
            localStorage.setItem("data", JSON.stringify(getData));
            
            
            // ajouter une alerte pour avertir que le produit a ete supprimer
            alert("Le produit clicke a ete supprime du panier");
            
            getData = JSON.parse(localStorage.getItem("data"));

            window.location.reload();
        })
    }
}

// realisation du formulaire
function displayForm() {
    // 1 - recupere les donnees saisies (contact)
    // 2 - Regex
    // 3 - construire le tableau d'ids
    // 5 - fetch POST

    const btnSubmit = document.querySelector("#order");

    btnSubmit.addEventListener("click", (e) => {
        e.preventDefault();
        
        // verifions que l'utilisateur a selectionner un produit au minimum avant de remplir le formulaire et commander
        if(basket.length === 0) {
            alert("veuillez selectionner un produit a acheter!!");
            return;
        }

        if(calcTotalQuantity() >= 101) {
            alert("La quantite maximale de produits est de 100 !");
            return;
        }

        
        if(!firstNameValidation() || !lastNameValidation() || !addressValidation() || !cityValidation() || !emailValidation()) 
        {
            return;
        } else if(firstNameValidation() && lastNameValidation() && addressValidation() && cityValidation() && emailValidation()){
            const users = usersRequest();
            fetchOrder(users);
        }
    })
}

function usersRequest() {
    const cartOrderForm = document.querySelector(".cart__order__form");

    const firstnameValue = cartOrderForm.firstName.value;
    console.log(firstnameValue);
    const lastnameValue = cartOrderForm.lastName.value;
    const addressValue = cartOrderForm.address.value;
    const cityValue = cartOrderForm.city.value;
    const emailValue = cartOrderForm.email.value;

    const users = {
        contact: {
            firstName: firstnameValue,
            lastName: lastnameValue,
            address: addressValue,
            city: cityValue,
            email: emailValue,
        },
        products: getIdsFromStorage()
    }
    return users;
}
// Je verifie la validité du champ "firstName"
function firstNameValidation() {
    const firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
    
    const cartOrderForm = document.querySelector(".cart__order__form");

    const nameRegex = /^([A-Za-z\s-]{3,20})$/;
    
    const firstnameValue = cartOrderForm.firstName.value;

    if(!firstnameValue.match(nameRegex)) {
        firstNameErrorMsg.innerHTML = "firstName is not valid";
        return false;
    }
    firstNameErrorMsg.innerHTML = "";
    return true;
}

// Je verifie la validité du champ "lastName"
function lastNameValidation() {
    const lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");

    const cartOrderForm = document.querySelector(".cart__order__form");
    
    const lastnameValue = cartOrderForm.lastName.value;

    const nameRegex = /^([A-Za-z\s-]{3,20})$/;

    if(!lastnameValue.match(nameRegex)) {
        lastNameErrorMsg.innerHTML = "lastName is not valid";
        return false;
    }
    lastNameErrorMsg.innerHTML = "";
    return true;
}

// Je verifie la validité du champ "address"
function addressValidation() {
    const addressErrorMsg = document.querySelector("#addressErrorMsg");

    const cartOrderForm = document.querySelector(".cart__order__form");
    
    const addressValue = cartOrderForm.address.value;

    const nameRegex = /^[a-zA-Z0-9\s,.'-]{5,50}$/;

    if(!addressValue.match(nameRegex)) {
        addressErrorMsg.innerHTML = "address is not valid";
        return false;
    }
    addressErrorMsg.innerHTML = "";
    return true;
}

// Je verifie la validité du champ "city"
function cityValidation() {
    const cityErrorMsg = document.querySelector("#cityErrorMsg");

    const cartOrderForm = document.querySelector(".cart__order__form");
    
    const cityValue = cartOrderForm.city.value;

    const nameRegex = /^([A-Za-z\s-]{3,40})$/;

    if(!cityValue.match(nameRegex)) {
        cityErrorMsg.innerHTML = "city name is not valid";
        return false;
    }
    cityErrorMsg.innerHTML = "";
    return true;
}

// Je verifie la validité du champ "email"
function emailValidation() {
    const emailErrorMsg = document.querySelector("#emailErrorMsg");

    const cartOrderForm = document.querySelector(".cart__order__form");
    
    const emailValue = cartOrderForm.email.value;

    const nameRegex = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,3}$/;

    if(!emailValue.match(nameRegex)) {
        emailErrorMsg.innerHTML = "email is not valid";
        return false;
    }
    emailErrorMsg.innerHTML = "";
    return true;
}


function getIdsFromStorage() {
    const ids = [];
    for(let i = 0; i < getData.length; i++) {
        ids.push(getData[i].id);
    }
    return ids;
}

async function fetchOrder(users) {

    return await fetch(`http://localhost:3000/api/products/order`, {
        method: "POST",
        body: JSON.stringify(users),
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        window.location.href = "../html/confirmation.html?orderId=" + data.orderId;
    });
}

async function asyncCart() {
    const products = await fetchCart();
    
    getData.forEach(function(getData) {
        products.forEach(function(product) {
            if(getData.id === product._id) {
                basket.push({
                    _id: getData.id,
                    name: product.name,
                    imageUrl: product.imageUrl,
                    altTxt: product.altTxt,
                    price: product.price,
                    color: getData.color,
                    quantity: getData.quantity
                })
            }
        });
        // console.log(basket);
    })
    displayProductInCart(basket);
    removeProductFromBasket();
    modifyQty();
    displayForm();
}
asyncCart();