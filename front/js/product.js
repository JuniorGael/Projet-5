
// Recuperer la liste des produits

const productUrl = window.location.search;

const urlSearch = new URLSearchParams(productUrl);

const productId = urlSearch.get("id");

function getQteProduct() {
    const qteProduct = parseInt(document.querySelector("#quantity").value);
    return qteProduct;
}

function getItemColors() {
    const itemColors = document.querySelector("#colors");
    return itemColors;
}


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
        const qteProduct = getQteProduct();

        const basket = {
            id: productId,
            color: itemColors.value,
            quantity: qteProduct
        };
        
        // const basket = getProduct();

        const getData = JSON.parse(localStorage.getItem("data") || "[]");

        const foundProduct = getData.find(x => x.id === productId);

        const foundProductColor = getData.find(y => y.color === itemColors.value);


        
        if(basket.color === "" || basket.quantity === 0 || basket.quantity <= 0 || basket.quantity >= 101) {
            return alert("Veuillez ajouter une couleur et une quantite (quantite max = 100)");
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
    })
}

async function asyncFunction() {
    const product = await getProducts();
    displayProducts(product);
    addProduct();
}
asyncFunction();




