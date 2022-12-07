

const productUrl = window.location.search;

const urlSearch = new URLSearchParams(productUrl);

// on retourne la premiere valeur associe au parametre de recherche donne (dont l'id)
const productId = urlSearch.get("id");

function getItemColors() {
    const itemColors = document.querySelector("#colors");
    return itemColors;
}

// Recuperer l'id des produits avec fetch depuis le serveur pour les afficher
async function getProducts() {

    return await fetch(`http://localhost:3000/api/products/${productId}`) 
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        return data;
    });
}

// Afficher les articles du DOM
function displayProducts(arrayProduct) {
    // console.log(arrayProduct);

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
    
    const desc = document.querySelector("#description");
    
    // ajouter la description au produit
    desc.innerHTML = arrayProduct.description;
    // 
    itemDesc.appendChild(desc);
    // ================================================
    
    // ======= Parametres des couleurs ================
    let itemColors = getItemColors();
    for(let i = 0; i < arrayProduct.colors.length; i++) {
        // creer une option de couleurs
        const option = document.createElement("option");
        // ajouter une valeur 
        option.setAttribute("value", arrayProduct.colors[i])
        // ajouter un texte
        option.innerHTML = arrayProduct.colors[i];
        // 
        itemColors.appendChild(option);
    }
}

// Stocke les donnees dans le localStorage
function setProduct(basket) {
    localStorage.setItem("data", JSON.stringify(basket));
}

// Ajouter les donnees dans le localStorage au click
function addProduct() {

    const btnAddToCart = document.querySelector("#addToCart");

    
    btnAddToCart.addEventListener("click", () => {
        
        const itemColors = getItemColors();

        const qteProduct = document.querySelector("#quantity").value;
        const regex = /^([0-9])*$/;
        if(!qteProduct.match(regex)) {
            return alert("Veuillez entrer un nombre entier (entre 1 et 100) !!")
        }

        const basket = {
            id: productId,
            color: itemColors.value,
            quantity: qteProduct
        };

        const getData = JSON.parse(localStorage.getItem("data") || "[]");

        const foundProduct = getData.find(x => x.id === productId);

        const foundProductColor = getData.find(x => x.color === itemColors.value);
        console.log(foundProductColor);

        if(basket.color === "" || basket.quantity === 0) {
            return alert("Veuillez selectionner une couleur et une quantite!!")
        } else if(basket.color === ""){
            return alert("Veuillez choisir une couleur!!")
        } else if(basket.quantity === 0 || basket.quantity <= 0){
            return alert("Veuillez selectionner le nombre d'article !!")
        } else if(basket.quantity > 100){
            return alert("La quantite maximale de produits est de 100 !");
        } else {
            if(foundProduct != undefined && foundProductColor != undefined) {
                foundProductColor.quantity += basket.quantity;
                setProduct(getData);
            }
            else {
                getData.push(basket);
                setProduct(getData);
            }
        }
        alert("Votre produit a ete ajoute!!");
        window.location.href = "./cart.html";
    })
}

async function asyncFunction() {
    const product = await getProducts();
    displayProducts(product);
    addProduct();
}
asyncFunction();




