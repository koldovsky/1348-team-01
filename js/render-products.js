export function renderProducts(products, destination, amount) {
  let productsHTML = "";
  let defaultAmount = products.lenght;
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

                <div class="product__item-price">${product.price}${product.currency}</div>
                <div class="product__item-btn small-btn"><a href="#">Buy Now</a></div>
            </div>
        </div>
    `;
    counter++;
  }
  const productsContainer = document.querySelector(destination);
  productsContainer.innerHTML = productsHTML;
}
