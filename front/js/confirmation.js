const productUrl = window.location.search;

const urlSearch = new URLSearchParams(productUrl);

const orderId = urlSearch.get("orderId");

const confirmationId = document.querySelector("#orderId");

confirmationId.innerHTML = orderId;

localStorage.clear();