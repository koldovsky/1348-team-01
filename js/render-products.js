let products = null;
let lastProductId = 0;


export function getLastProductId(){
    if(lastProductId > 0) {
        return lastProductId;
    } else {
        return 0;
    }
}

export async function fetchProducts() {
    if (!products) { 
        const response = await fetch('api/products.json');
        products = await response.json();
    }
    return products;
}

export async function getCachedProducts() {
  if (!products) return [];
  return products;
}

async function productInfoClick(event) {
    const parent = document.querySelector(".product-info-page-link");
    let currentClick = event.target;
    console.log("First click",currentClick);
    while (String(parent) != String(currentClick)) {
        currentClick = currentClick.parentElement
        console.log(currentClick);
    }
    const productId = currentClick.dataset.id;
    const product = products.filter((product) => product.id == productId)[0];
    localStorage.product = JSON.stringify(product);
    // alert("yep")
}

export async function renderProducts(destination, amount, displayAllInfo = false, statusFilters = [], stockFilters = [], categoryFilters = [], countAll = false, exceptProducts = [], lastProduct = 1) {
    const products = await fetchProducts();
    let productsHTML = "";
    const isFiltering = statusFilters.length > 0 || stockFilters.length > 0 || categoryFilters.length > 0 || displayAllInfo;

    let filteredProducts = products.filter(product => {
        const matchesStatus = statusFilters.length === 0 || statusFilters.includes(product.status);
        const matchesStock = stockFilters.length === 0 || stockFilters.includes(product.stock);
        const matchesCategory = categoryFilters.length === 0 || categoryFilters.includes(product.category);
        const matchException = exceptProducts.includes(product.id);
        if (matchException) return false;
        return countAll 
            ? (matchesStatus && matchesStock && matchesCategory) 
            : (matchesStatus || matchesStock || matchesCategory);
    });

    let startIndex = lastProduct ? products.findIndex(p => p.id === lastProduct) + 1 : 0;
    if (startIndex < 0) startIndex = 0;

    filteredProducts = filteredProducts.slice(startIndex, startIndex + amount);
    console.log("filteredProducts:   ", filteredProducts);
    


    if (filteredProducts.length > 0) {
        lastProductId = filteredProducts[filteredProducts.length - 1].id;
    }

    for (const product of filteredProducts) {
        productsHTML += `
            <div class="product__item">
                <div class="product__item-wrapper">
                    <a class="product-info-page-link" href="product-info.html" data-id="${product.id}">
                        <div class="product__item-image">
                            <img src="${product.image}" alt="${product.title}">
                        </div>
                        <div class="product__item-name">${product.title}</div>
                    </a>
                    <div class="product__item-price">${product.price} ${product.currency}</div>
                    <div class="product__item-btn small-btn"><a href="#">Buy Now</a></div>
                </div>
            </div>
        `;
    }

    const productsContainer = document.querySelector(destination);
    if (productsContainer) {
        productsContainer.innerHTML += productsHTML;
        document.querySelectorAll(".product-info-page-link").forEach((link) => {
            link.addEventListener("click", productInfoClick);
        });
    }
}

// function loadAdditionProducts() {
//     const additionContainer = document.querySelector(".addition-items");
//     const btnLoadMore = document.querySelector(".categories__items-btn button");

//     btnLoadMore.addEventListener("click", () => {   
//         const destination = ".addition-items";
//         renderProducts(destination, 2, true, [], [], [], false, [], getLastProductId());
//     });
// }

// loadAdditionProducts();

