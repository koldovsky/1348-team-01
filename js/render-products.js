let products = null; // кеш

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

export async function renderProducts(destination, amount) {
    const products = await fetchProducts();
    let productsHTML = "";
    let defaultAmount = products.length;
    let counter = 0;

    if (amount > 0) {
        defaultAmount = amount;
    }

    for (const product of products) {
        if (counter === defaultAmount) {
            break;
        }
        productsHTML += 
        `
            <div class="product__item">
                <div class="product__item-wrapper">
                    <a href="#">
                        <div class="product__item-image">
                            <img src="${product.image}">
                        </div>
                        <div class="product__item-name">${product.title}</div>
                    </a>
                    <div class="product__item-price">${product.price} ${product.currency}</div>
                    <div class="product__item-btn small-btn"><a href="#">Buy Now</a></div>
                </div>
            </div>
        `;
        counter++;
    }

    const productsContainer = document.querySelector(destination);
    if (productsContainer) {
        productsContainer.innerHTML = productsHTML;
    }
}
