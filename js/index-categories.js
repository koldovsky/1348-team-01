import { renderProducts, fetchProducts, getLastProductId} from "./render-products.js";
const filterItems = document.querySelector(".filters__navbar")
const products = await fetchProducts();

// ACCORDION ITEMS
const accordionItems = document.querySelectorAll(".navbar-item")

accordionItems.forEach((item, index) => {
    const title = item.querySelector(".navbar-item__header")
    const description = item.querySelector(".navbar-item__category-options")
    const btn = item.querySelector(".navbar-item__btn")

    title.addEventListener("click", () => {
        item.classList.toggle("open")
        console.log(description.scrollHeight);
        if (item.classList.contains("open")) {
            description.style.height = `${description.scrollHeight}px`
        } else {
            description.style.height = `0px`
        }
    })
})
// -------------------------//

const categories = getProductsCategories(products);
renderProducts(".categories__items", 12, true, [], [], [], false, [], 0)
displayProductsCategories(categories, ".navbar-item__category-options")

function loadAdditionProducts(category) {
    const additionContainer = document.querySelector(".addition-items");
    const btnLoadMore = document.querySelector(".categories__items-btn button");
    console.log("CATEGORY",category);
    
    btnLoadMore.addEventListener("click", () => {   
        const destination = ".addition-items";
        const filterCategorie = [];
        if (category !== null) {
            filterCategorie.push(category);
        } 
        renderProducts(destination, 2, true, [], [], filterCategorie, false, [], getLastProductId());
        
        console.log("Section: ", category);
        
        console.log("Add products");
    });
}


loadAdditionProducts();

function getProductsCategories(products){
    const result = [];
    for (const product of products) {
        let category = product.category;
        if (!result.includes(category)) {
            result.push(category)
        }
    }
    return result
}


function displayProductsCategories(categories, destination){
    const productsContainer = document.querySelector(".categories__items")
    productsContainer.innerHTML = "";
    const wrapper = document.querySelector(destination)
    let innerContent = "<li><button>All</button></li>";
    categories.forEach(category => {
        innerContent += `<li><button>${category[0].toUpperCase() + category.slice(1)}</button></li>`
    })
    if (innerContent) {
        wrapper.innerHTML = innerContent;
        wrapper.querySelectorAll('button').forEach(element => {
            element.addEventListener("click", () => {
                const category = element.textContent.toLowerCase();
                console.log(category, typeof category);
                
                if (category.toLowerCase() === "all") {
                    document.querySelector(".categories__items").innerHTML = ""
                    document.querySelector(".addition-items").innerHTML = ""
                    renderProducts(".categories__items", 12, true, [], [], [], true, [], 0);
                    loadAdditionProducts(null);

                } else {
                    document.querySelector(".categories__items").innerHTML = ""
                    document.querySelector(".addition-items").innerHTML = ""
                    renderProducts(".categories__items", 12, true, [], [], [category], true, [], 0);
                    loadAdditionProducts(category);
                    
                    
                }
                
                
            })
        })
    }
}


