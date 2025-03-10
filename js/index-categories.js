import { renderProducts, fetchProducts, getLastProductId } from "./render-products.js";
const products = await fetchProducts();
const categories = getProductsCategories(products);

const categoryProperties = {
    "mouse": {
        "dpi": [],
        "sensor": [],
        "connection": [],
        "color": []
    },
    "monitor": {
        "diagonal": [],
        "panelType": [],
        "responseTime": [],
        "refreshRate": [],
        "resolution": [],
        "color": []
    },
    "keyboard": {
        "type": [],
        "switches": [],
        "specialFeature": [],
        "color": []
    },
    "headset": {
        "sensitivity": [],
        "impedance": [],
        "frequencyRange": [],
        "color": []
    }
}

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


function getProductsCategories(products) {
    const result = [];
    for (const product of products) {
        let category = product.category;
        if (!result.includes(category)) {
            result.push(category)
        }
    }
    return result
}


// function displayProductsCategories(categories, destination) {
//     const productsContainer = document.querySelector(".categories__items")
//     productsContainer.innerHTML = "";
//     const wrapper = document.querySelector(destination)
//     let innerContent = "<li><button>All</button></li>";
//     categories.forEach(category => {
//         innerContent += `<li><button>${category[0].toUpperCase() + category.slice(1)}</button></li>`
//     })
//     if (innerContent) {
//         wrapper.innerHTML = innerContent;
//         wrapper.querySelectorAll('button').forEach(element => {
//             element.addEventListener("click", () => {
//                 const loadBtnContainer = document.querySelector(".categories__items-container");
//                 const category = element.textContent.toLowerCase();

//                 if (category.toLowerCase() === "all") {
//                     document.querySelector(".categories__items").innerHTML = ""
//                     document.querySelector(".addition-items").innerHTML = ""
//                     renderProducts(".categories__items", 12, true, [], [], [], true, [], 0);
//                     loadBtnContainer.classList.add("load-btn")
//                     loadAdditionProducts();

//                 } else {
//                     document.querySelector(".categories__items").innerHTML = ""
//                     document.querySelector(".addition-items").innerHTML = ""
//                     renderProducts(".categories__items", 12, true, [], [], [category], true, [], 0);
//                     loadBtnContainer.classList.remove("load-btn")
//                 }


//             })
//         })
//     }
// }


function displayProductOptions(categoryProperties, destination) {
    const navbarContainer = document.querySelector(destination) //.filters__navbar
    const optionsContainer = document.querySelector(".navbar-item-options")
    let innerHtmlContainer = "";

    for (const product of products) {
        const category = product.category;

        if (categoryProperties[category]) {
            for (const property in categoryProperties[category]) {
                const productKey = property.toLowerCase();

                if (productKey in product) {
                    const value = product[productKey];

                    if (!categoryProperties[category][property].includes(value)) {
                        categoryProperties[category][property].push(value);
                    }
                }
            }
        }
    }



    // ------------------------------------------------------------------------------
    const productsContainer = document.querySelector(".categories__items")
    productsContainer.innerHTML = "";
    const wrapper = document.querySelector(".navbar-item__category-options")
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
    // ------------------------------------------------------------------------------



    for (const category in categoryProperties){
        console.log(category)
        innerHtmlContainer += `
        <div class="navbar-item">
            <div class="navbar-item__header">
                <div class="navbar-item__title">${category}</div>
                <div class="navbar-item__btn"><img src="./img/index/arrow-down.png" alt=""></div>
            </div>
            <div class="navbar-item-options"></div>
        </div>
        `
    }

    console.log(categoryProperties);




    if (navbarContainer) {
        navbarContainer.insertAdjacentHTML("beforeend", innerHtmlContainer)
    }

}

// displayProductsCategories(categories, ".navbar-item__category-options")
displayProductOptions(categoryProperties, ".filters__navbar")


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