let currentPage = 0;
const pageSizes = [16,12,12,10];
let allProducts = [];

function startShop() {
  allProducts = document.querySelectorAll(".store-products__item");
  if (allProducts.length === 0) {
    console.log("Error!");
    return;
  }

  let pageInUrl = window.location.search;
  if (pageInUrl === "?page=1") currentPage = 0;
  if (pageInUrl === "?page=2") currentPage = 1;
  if (pageInUrl === "?page=3") currentPage = 2;
  if (pageInUrl === "?page=4") currentPage = 3;
  showProducts();
}

function showProducts() {
  let start = 0;
  if (currentPage > 0) {
    for (let i = 0; i < currentPage; i++) {
      start += pageSizes[i];
    }
  }
  let end = start + pageSizes[currentPage];

  allProducts.forEach((product, number) => {
    if (number >= start && number < end) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });

  document.querySelectorAll(".page-btn").forEach((button, index) => {
    let pageIndex = index - 1;
    if (button.textContent === "<" || button.textContent === ">") return;
    button.classList.toggle("active", pageIndex === currentPage);
  });

  if (currentPage === 0) window.history.pushState({}, "", "?page=1");
  if (currentPage === 1) window.history.pushState({}, "", "?page=2");
  if (currentPage === 2) window.history.pushState({}, "", "?page=3");
  if (currentPage === 3) window.history.pushState({}, "", "?page=4");
}

function goToPage(newPage) {
  if (newPage >= 0 && newPage < pageSizes.length) {
    currentPage = newPage;
    showProducts();
  }
}

document.querySelectorAll(".page-btn").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.textContent === "<") {
      goToPage(currentPage - 1);
    } else if (button.textContent === ">") {
      goToPage(currentPage + 1);
    } else {
      goToPage(Number(button.textContent) - 1);
    }
  });
});
startShop();
