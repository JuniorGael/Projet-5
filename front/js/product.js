
// Recuperer la liste des produits

const productUrl = window.location.search;

// console.log(productUrl);

const urlSearch = new URLSearchParams(productUrl);

// console.log(urlSearch);

const productId = urlSearch.get("id");

// console.log(productId);

const qteProduct = document.querySelector("#quantity");

const itemColors = document.querySelector("#colors");
// console.log(itemColors);


async function getProducts() {

    return await fetch(`http://localhost:3000/api/products/${productId}`) 
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        return data;
    });
}

function displayProducts(arrayProduct) {
    console.log(arrayProduct);

    // console.log(arrayProduct.imageUrl);
    const itemProduct = document.querySelector(".item__img");
    // console.log(itemProduct);

    // ===== Image du produit =========================
    // Creer une image du produit
    const image = document.createElement("img");
    // ajouter une source a l'image
    image.src = arrayProduct.imageUrl;
    // ajouter l'element 'alt'
    image.alt = arrayProduct.altTxt;
    // 
    itemProduct.appendChild(image);
    // ================================================
    
    // ====== Nom du produit ==========================
    const itemTextPrice = document.querySelector(".item__content__titlePrice");
    // console.log(itemTextPrice);
    
    const itemName = document.querySelector("#title")
    // console.log(itemName);
    
    const itemPrice = document.querySelector("#price");
    // console.log(itemPrice);
    
    // ajouter le nom du produit
    itemName.innerHTML = arrayProduct.name;
    // ajouter un prix au produit
    itemPrice.innerHTML = arrayProduct.price;
    // 
    itemTextPrice.appendChild(itemName);
    // ===============================================
    
    // ====== Description du produit =================
    const itemDesc = document.querySelector(".item__content__description");
    // console.log(itemDesc);
    
    const desc = document.querySelector("#description");
    // console.log(desc);
    
    // ajouter la description au produit
    desc.innerHTML = arrayProduct.description;
    // 
    itemDesc.appendChild(desc);
    // ================================================
    
    // ======= Parametres des couleurs ================
    // console.log(itemColors);
    
    for(let i = 0; i < arrayProduct.colors.length; i++) {
        // creer une option de couleurs
        const option = document.createElement("option");
        // console.log(option);
        // ajouter une valeur 
        option.setAttribute("value", arrayProduct.colors[i])
        // ajouter un texte
        option.innerHTML = arrayProduct.colors[i];
        // 
        itemColors.appendChild(option);
    }
}

// function monPanier() {
//     // selectionne l'id du produit correspond
//     const btnAjouter = document.querySelector("#addToCart");
//     console.log(btnAjouter);

//     btnAjouter.addEventListener("click", () => {
//         let storage = JSON.parse(localStorage.getItem("productStorage"));

//         const arrayStorage = {
//             id: productId,
//             color: itemColors.value,
//             quantity: qteProduct.value
//         }

//         if(storage === null) {
//             storage = [];
//             storage.push(arrayStorage);
//             localStorage.setItem("productStorage", JSON.stringify(storage));
//         } else {
            
//         }
//     })
// }
// monPanier();

let arrayProducts = {
    id: productId,
    color: itemColors.value,
    quantity: qteProduct.value
};

let basket = [];

// Stocke les donnees dans le localStorage
function setProduct(arrayProducts) {
    localStorage.setItem("data", JSON.stringify(arrayProducts));
}

// Selectionner l'id correspond au produit
function getProduct() {
    const storage = localStorage.getItem("data");

    if(storage === null) {
        return [];
    } else {
        return JSON.parse(storage);
    }
}

// Ajouter les donnees dans le localStorage au click
function addProduct(arrayProducts) {

    const btnAddToCart = document.querySelector("#addToCart");

    // console.log(btnAddToCart);
    
    btnAddToCart.addEventListener("click", () => {
        const basket = getProduct();

        const foundProduct = basket.find(x => x.id === productId && x.color === itemColors.value);

        if(foundProduct != undefined) {
            foundProduct.quantity++;
        } else {
            arrayProducts.quantity = 1;
            basket.push(arrayProducts);
        }
        setProduct(basket);
    })
}
addProduct(arrayProducts);

async function asyncFunction() {
    const product = await getProducts();
    displayProducts(product);
}
asyncFunction();




