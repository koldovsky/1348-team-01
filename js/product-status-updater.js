function updateProductStatus() {
  const products = [...document.querySelectorAll(".store-products__item")];

  if (products.length === 0) return;

  // Видалення попередніх статусів
  document
    .querySelectorAll(".store-products__status")
    .forEach((el) => el.remove());

  // Перемішуємо товари
  products.sort(() => Math.random() - 0.5);

  // Визначаємо кількість статусів
  const preOrderCount = Math.floor(Math.random() * (7 - 6 + 1)) + 6;
  const outOfStockCount = Math.floor(Math.random() * (5 - 3 + 1)) + 3;

  // Вибираємо товари для Pre-order та Out of stock
  const preOrderProducts = products.slice(0, preOrderCount);
  const outOfStockProducts = products.slice(
    preOrderCount,
    preOrderCount + outOfStockCount
  );

  function createStatusLabel(text, className) {
    const label = document.createElement("div");
    label.classList.add("store-products__status", className);
    label.textContent = text;
    return label;
  }

  // Pre-order
  preOrderProducts.forEach((product) => {
    const productImage = product.querySelector(".store-products__image");
    if (productImage) {
      const preOrderLabel = createStatusLabel(
        "Pre-order",
        "store-products__pre-order"
      );
      productImage.insertAdjacentElement("afterend", preOrderLabel);
    }
  });

  // Out of stock
  outOfStockProducts.forEach((product) => {
    const productImage = product.querySelector(".store-products__image");
    if (productImage) {
      const outOfStockLabel = createStatusLabel(
        "Out of stock",
        "store-products__out-of-stock"
      );
      productImage.insertAdjacentElement("afterend", outOfStockLabel);
    }
  });
}

setInterval(updateProductStatus, 15000);
updateProductStatus();
