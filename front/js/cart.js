let getData = JSON.parse(localStorage.getItem("data") || "[]");
// console.log(getData);
const cartItems = document.getElementById("cart__items");
let basket = [];


async function fetchCart() {
    return await fetch(`http://localhost:3000/api/products`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        return data;
    });
}

function displayProductInCart() {

    cartItems.replaceChildren();
    
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

// ====== Calcul de la quantite totale des produits enregistres dans le panier ========================
// declaration de la variable pour y mettre les quantites qui sont presents dans le panier
const qteTotalCalc = [];
function totalQuantity() {
    const quantity = document.querySelector(".cart__price");
    const qte = document.querySelector("#totalQuantity");

    for(let i = 0; i < basket.length; i++) {
        const totalNberOfQuantityInBasket = basket[i].quantity;

        // mettre les qtes du produits dans la variable "qteTotal"
        qteTotalCalc.push(totalNberOfQuantityInBasket);
    }

    // additionner les qtes des produits qu'il ya dans la variable "qteTotal" avec la methode 'reduce'
    const reducer = (x,y) => {
        return x + y;
    }
    const totalQty = qteTotalCalc.reduce(reducer, 0);

    // afficher la quantite totale
    qte.innerHTML = `${totalQty}`;
}

// =============== Calcul du prix total des produits enregistres dans le panier =========================
// declaration de la variable pour y mettre les prix qui sont presents dans le panier
const prixTotalCalc = [];
function totalPrice() {
    const cartPrice = document.querySelector(".cart__price");
    const price = document.querySelector("#totalPrice");

    for(let i = 0; i < basket.length; i++) {
        const totalPriceInBasket = basket[i].price * basket[i].quantity;

        prixTotalCalc.push(totalPriceInBasket);
    }

    const reducer = (x,y) => {
        return x + y;
    }
    // console.log(reducer);
    const totalAmount = prixTotalCalc.reduce(reducer, 0);

    // Afficher le prix total
    price.innerHTML = `${totalAmount}`;
}

// ===== Modifier la quantite totale et le prix total enregistres dans le panier ========================
// function updateQtyAndPrice() {
//     const itemQty = document.querySelector(".itemQuantity");
//     // console.log(itemQty);
    
//     for(let i = 0; i < getData.length; i++) {
//         itemQty.addEventListener("change", () => {
//             const updateQty = getData.find(x => x._id === itemQty._id); 
            
//             const newQtyValue = itemQty.value;
            
//             updateQty.quantity = parseInt(newQtyValue);
            
//             // console.log(getData);
//             totalQuantity();
//             totalPrice();
//         })
//     }
// }



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
    displayProductInCart();
    removeProductFromBasket();
    totalQuantity();
    totalPrice();
    updateQtyAndPrice();
}
asyncCart();