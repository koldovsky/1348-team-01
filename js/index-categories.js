import { renderProducts, fetchProducts, getLastProductId} from "./render-products.js";
const filterItems = document.querySelector(".filters__navbar")
const products = await fetchProducts();
const categories = getProductsCategories(products);

const categoryProperties = {
    "mouse": {
        "DPI": [],
        "Sensor": [],
        "Connection": [],
        "Color": []
    },
    "monitor": {
        "Diagonal": [],
        "Panel Type": [],
        "Response Time": [],
        "Refresh Rate": [],
        "Resolution": [],
        "Color": []
        },
    "keyboard": {
        "Type": [],
        "Switches": [],
        "Special Feature": [],
        "Color": []
        },
    "headset": {
        "Sensitivity": [],
        "Impedance": [],
        "Frequency Range": [],
        "Color": []
    }
}


// ACCORDION ITEMS
const accordionItems = document.querySelectorAll(".navbar-item")

accordionItems.forEach((item, index) => {
    const title = item.querySelector(".navbar-item__header")
    const description = item.querySelector(".navbar-item__category-options")

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

renderProducts(".categories__items", 12, true, [], [], [], false, [], 0)
loadAdditionProducts();


function loadAdditionProducts() {
    const additionContainer = document.querySelector(".addition-items");
    const btnLoadMore = document.querySelector(".categories__items-btn button");
    
    btnLoadMore.addEventListener("click", () => {   
        const destination = ".addition-items";
        renderProducts(destination, 4, true, [], [], [], false, [], getLastProductId());
        
    });
}


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
                const loadBtnContainer = document.querySelector(".categories__items-container");
                const category = element.textContent.toLowerCase();
                
                if (category.toLowerCase() === "all") {
                    document.querySelector(".categories__items").innerHTML = ""
                    document.querySelector(".addition-items").innerHTML = ""
                    renderProducts(".categories__items", 12, true, [], [], [], true, [], 0);
                    loadBtnContainer.classList.add("load-btn")
                    loadAdditionProducts();

                } else {
                    document.querySelector(".categories__items").innerHTML = ""
                    document.querySelector(".addition-items").innerHTML = ""
                    renderProducts(".categories__items", 12, true, [], [], [category], true, [], 0);                   
                    loadBtnContainer.classList.remove("load-btn")
                }
                
                
            })
        })
    }
}

displayProductsCategories(categories, ".navbar-item__category-options")