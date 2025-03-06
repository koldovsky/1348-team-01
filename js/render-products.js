let products = null;

export async function fetchProducts() {
    if (!products) { 
        const response = await fetch('api/products.json');
        products = await response.json();
    }
    return products;
}

export function getCachedProducts(size) {
  if (!products) return [];
  return products.slice(0, size);
}

export async function renderProducts(destination, amount, displayAllInfo = false, statusFilters = [], stockFilters = [], countAll = false) {
    const products = await fetchProducts();
    let productsHTML = "";
    const isFiltering = statusFilters.length > 0 || stockFilters.length > 0 || displayAllInfo;

    let filteredProducts = products.filter(product => {
        const matchesStatus = statusFilters.length === 0 || statusFilters.includes(product.status);
        const matchesStock = stockFilters.length === 0 || stockFilters.includes(product.stock);
        if (countAll){
            return matchesStatus && matchesStock;
        } else {
            return matchesStatus || matchesStock;
        }
    }).slice(0, amount);

    for (const product of filteredProducts) {
        let productClasses = "product__item";

        const statusClass = product.status ? `status__${product.status.toLowerCase().replace(/(?<=\S) (\S)/g, '-').trim()}` : "";
        const stockClass = product.stock ? `stock__${product.stock.toLowerCase().replace(/(?<=\S) (\S)/g, '-').trim()}` : "";
        productClasses += ` ${statusClass} ${stockClass}`;

        productsHTML += `
            <div class="${productClasses.trim()}">
                <div class="product__item-wrapper">
                    <a href="#">
                        <div class="product__item-image">
                            <img src="${product.image}" alt="${product.title}">
                            ${isFiltering ? `<div class="product__item-stock${product.stock === "pre order" ? " pre-order" : (product.stock === "out of stock" ? " out-of-stock" : "")}">${product.stock !== "in stock" ? product.stock : ""}</div>` : ""}
                        </div>
                        <div class="product__item-name">${product.title}</div>
                    </a>
                    <div class="product__item-price${product.status === "Sale" ? " discount-price" : ""}">
                    ${product.status === "Sale"
                         ? `<p>${product.price} ${product.currency}</p><p>${(product.price - (product.percentage / 100 * product.price)).toFixed(2)} ${product.currency}</p>` 
                         : `<p>${product.price} ${product.currency}</p>`}</div>
                    <div class="product__item-btn small-btn"><a href="#">Buy Now</a></div>
                    ${isFiltering ? `<div class="product__item-status">${product.status}</div>` : ""}
                </div>
            </div>
        `;
    }

    const productsContainer = document.querySelector(destination);
    if (productsContainer) {
        productsContainer.innerHTML = productsHTML;
    }
}
