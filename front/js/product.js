
// Recuperer la liste des produits

const productUrl = window.location.search;

console.log(productUrl);

const urlSearch = new URLSearchParams(productUrl);

console.log(urlSearch);

const productId = urlSearch.get("id");

console.log(productId);


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
}


async function asyncFunction() {
    const product = await getProducts();
    displayProducts(product);
}
asyncFunction();







// let str = "htpps://waytolearnx.com/t.html?name=alex-babtise&age=25&address=paris";

// let url = new URL(str);

// let name = url.searchParams.get("name");

// let age = url.searchParams.get("age");

// let address = url.searchParams.get("address");

// console.log(name);

// console.log(age);

// console.log(address);
