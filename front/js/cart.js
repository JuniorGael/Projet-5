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

    // cartItems.replaceChildren();
    
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
    // getData.forEach((item) => {
    //     const totalUnitPrice = total + item.quantity;

    //     total =  totalUnitPrice;
    // })
    // qte.innerHTML = total;

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

// 
function cartForm() {
    const cartOrderForm = document.querySelector(".cart__order__form");

    // console.log(cartOrderForm.elements);

    const firstname = document.querySelector("#firstName");
    // console.log(firstname);
    const lastname = document.querySelector("#lastName");
    // console.log(lastname);
    const address = document.querySelector("#address");
    // console.log(address);
    const city = document.querySelector("#city");
    // console.log(city);
    const email = document.querySelector("#email");
    // console.log(email);

    const btnSubmit = document.querySelector("#order");
    // console.log(btnSubmit);
    
    btnSubmit.addEventListener("click", (e) => {
        e.preventDefault();
        // console.log("btn is clicked");

        // Recuperer les donnees du formulaire pour les envoyer dans le localStorage
        const users = {
                contact: {
                firstName: "John",
                lastName: "Doe",
                address: "saint-peterburg",
                city: "saint-peterburg",
                email: "jdoe@gmail.com",
            },
            products: getData._id
        } 
        console.log(users);

        localStorage.setItem("user", JSON.stringify(users.contact));
    })
}
cartForm();


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
}
asyncCart();