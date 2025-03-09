function showProductInfo() {
    const product = JSON.parse(localStorage.product || '{}');
    if (!product) {
        console.log("ERORRR, there is no JSON");
        return
    } else {
        console.log("JSON is :", product);
        
    };
    const category = document.querySelector('.bradcrumb__category-link')
    category.innerText = product.category;
    category.setAttribute("href", `${product.category}.html`)
    document.querySelector(".product-info__img").setAttribute("src", product.image)
    document.querySelector('.product-info__title').innerText = product.title;
    const stock = document.querySelector('.product-info__stock')
    stock.innerText = product.stock;
    if (product.stock !== "in stock") {
        stock.style.color = "#cc3833"
    }
    
    document.querySelector('.product-info__code').innerText = "Product code " + product.id;
    const price = document.querySelector('.without-sale')
    price.innerText = product.price;

    if (product.percentage) {
        document.querySelector('.with-sale').innerText = (product.price - Math.floor(product.percentage / 100 * product.price)).toFixed(2);
        price.style.textDecoration = "line-through";
    }

    // TABS

    const tabs = document.querySelectorAll(".tab-item");
    tabs.forEach((tab) => {
        const header = document.querySelector(".tab-item__header");
        const content = document.querySelector(".tab-item__content");
        const description = document.querySelector(".tab-item__description");
        description.innerText = product.description
        header.addEventListener("click", () => {
            console.log("click");
            tab.classList.add("active")
        })
    })
}
 
showProductInfo();