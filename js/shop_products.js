let currentPage = 0; 
const pageSizes = [15, 5]; 
let allProducts = []; 


function startShop() {
  allProducts = document.querySelectorAll(".store-products__item"); 
  if (allProducts.length === 0) {
    console.log("Error!");
    return;
  }
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
    const pageIndex = index - 1;
    if (button.textContent === "<" || button.textContent === ">") return;
    button.classList.toggle("active", pageIndex === currentPage);
  });
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