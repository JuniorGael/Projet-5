
// Recuperer la liste des produits avec fetch depuis le serveur pour les afficher
async function getProducts() {
    return await fetch('http://localhost:3000/api/products') 
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        return data;
    });
}

// Generer les produits du DOM pour recuperer les elements de la page d'accueil
function createProducts(dataProducts) {
    
    const item = document.querySelector("#items");

    for(let i = 0; i < dataProducts.length; i++) {

        // creer la balise 'a'
        const ancre = document.createElement("a");
        //  ajouter l'element 'href'
        ancre.href = "./product.html?id=" + dataProducts[i]._id;

        // creer la balise 'article'
        const article = document.createElement('article');
        // 
        ancre.appendChild(article);

        // creer l'image
        const image = document.createElement('img');
        // ajouter l'element 'src'
        image.src = dataProducts[i].imageUrl;
        // ajouter l'element 'alt'
        image.alt = dataProducts[i].altTxt;
        // 
        article.appendChild(image);

        // creer la balise 'h3'
        const name = document.createElement('h3');
        // ajouter une classe a la balise 'h3'
        name.classList.add('productName');
        // ajouter du contenu dans la balise 'h3'
        name.innerHTML = dataProducts[i].name;
        // 
        article.appendChild(name);

        // creer un paragraphe 'p'
        const desc = document.createElement('p');
        // creer une classe
        desc.classList.add('productDescription');
        // ajouter une description a la balise 'p'
        desc.innerHTML = dataProducts[i].description;
        // 
        article.appendChild(desc);

        // 
        item.appendChild(ancre);
    }
}

// Lancer les fonctions asynchrones 
async function asyncFunction() {
    const dataProducts = await getProducts();
    // console.log(dataProducts);
    createProducts(dataProducts);
}
asyncFunction();


