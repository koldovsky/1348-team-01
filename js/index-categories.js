import { renderProducts, fetchProducts, getLastProductId } from "./render-products.js";
const products = await fetchProducts();
const categories = getProductsCategories(products);
const navbarContainer = document.querySelector(".filters__navbar") //.filters__navbar

const filtersMenuBtn = document.querySelector(".filters__btn img");
filtersMenuBtn.addEventListener("click", () => {
    const menu = document.querySelector(".filters")
    menu.classList.toggle("full-screen")
    if (menu.classList.contains("full-screen")){
        filtersMenuBtn.src = "./img/index/close.svg"
    } else {
        filtersMenuBtn.src = "./img/index/filters.png"
    }
})

const categoryProperties = {
    "mouse": {
        "dpi": [],
        "sensor": [],
        "connection": [],
        "color": []
    },
    "monitor": {
        "diagonal": [],
        "panel_type": [],
        "response_time": [],
        "refresh_rate": [],
        "resolution": [],
        "color": []
    },
    "keyboard": {
        "type": [],
        "switches": [],
        "special_feature": [],
        "color": []
    },
    "headset": {
        "sensitivity": [],
        "impedance": [],
        "frequency_range": [],
        "color": []
    }
}

// Downloading addition items
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

// Display all categories list and render products according clicked filters 
function displayProductsCategories(categoryProperties) {
    // Fill oblect properties
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
        const buttons = wrapper.querySelectorAll('button')
        buttons.forEach(btn => {

            btn.addEventListener("click", () => {
                const loadBtnContainer = document.querySelector(".categories__items-container");
                const category = btn.textContent.toLowerCase();
                buttons.forEach(button => button.classList.remove("selected"));
                btn.classList.add("selected")

                if (category.toLowerCase() === "all") {
                    document.querySelector(".categories__items").innerHTML = ""
                    document.querySelector(".addition-items").innerHTML = ""
                    while (navbarContainer.children.length > 1) {
                        navbarContainer.removeChild(navbarContainer.lastChild);
                    }
                    renderProducts(".categories__items", 12, true, [], [], [], true, [], 0);
                    loadBtnContainer.classList.add("load-btn")
                    loadAdditionProducts();
                    

                } else {
                    document.querySelector(".categories__items").innerHTML = ""
                    document.querySelector(".addition-items").innerHTML = ""
                    renderProducts(".categories__items", 12, true, [], [], [category], true, [], 0);
                    loadBtnContainer.classList.remove("load-btn")
                    while (navbarContainer.children.length > 1) {
                        navbarContainer.removeChild(navbarContainer.lastChild);
                    }
                    displayAllFilters(category)
                    renderProductsThroughFilters(category)
                }
            })

        
        })
    }
    // ------------------------------------------------------------------------------
    
}

// Display all options
function displayAllFilters(category) {
    let filterHTML = "";
    for (const property in categoryProperties[category]) {
        let properties = ""
        for (const value of categoryProperties[category][property]) {
            properties += 
            `
                <label class="checkbox-label">
                    <input type="checkbox" value="${value}" class="checkbox">${value}
                </label>
            `
        }

        filterHTML += `
            <div class="navbar-item">
                <div class="navbar-item__header">
                    <div class="navbar-item__title">${property[0].toLocaleUpperCase() + property.replace("_", " ").slice(1)}</div>
                    <div class="navbar-item__btn"><img src="./img/index/arrow-down.png" alt=""></div>
                </div>
                <div class="navbar-item-options accordion-description">${properties}</div>
            </div>`;
    }
    if (navbarContainer) {
        navbarContainer.insertAdjacentHTML("beforeend", filterHTML);
    }

    initAccordion();
}


// ACCORDION 
function initAccordion(){
    const accordionItems = document.querySelectorAll(".navbar-item")
    accordionItems.forEach((item, index) => {
        const title = item.querySelector(".navbar-item__header")
        const description = item.querySelector(".accordion-description");
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
}


function renderProductsThroughFilters(category){
    const checkboxes = document.querySelectorAll(".checkbox");
    let checkedFilters = {};

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            const filterType = checkbox.closest(".navbar-item").querySelector(".navbar-item__title").textContent.toLowerCase();
            const filterValue = checkbox.value;

            // Додаємо або видаляємо значення з фільтрів
            if (checkbox.checked) {
                if (!checkedFilters[filterType]) {
                    checkedFilters[filterType] = [];
                }
                if (!checkedFilters[filterType].includes(filterValue)) {
                    checkedFilters[filterType].push(filterValue);
                }
            } else {
                if (checkedFilters[filterType]) {
                    checkedFilters[filterType] = checkedFilters[filterType].filter(val => val !== filterValue);
                    if (checkedFilters[filterType].length === 0) {
                        delete checkedFilters[filterType];
                    }
                }
            }

            console.log("Filters:", checkedFilters);

            const filteredProducts = products.filter(product => {
                if (product.category !== category) return false;

                for (const filterType in checkedFilters) {
                    if (!checkedFilters[filterType].some(value => product[filterType]?.toString() === value)) {
                        return false;
                    }
                }
                return true;
            });

            const productsContainer = document.querySelector(".categories__items");
            productsContainer.innerHTML = "";
            productsContainer.classList.remove("empty")
            

            if (filteredProducts.length === 0) {
                productsContainer.classList.add("empty")
                productsContainer.innerHTML = `<div class="no-products">No products found.</div>`;
                return;
            }

            filteredProducts.forEach(product => {
                productsContainer.innerHTML += `
                    <div class="product__item">
                        <div class="product__item-wrapper">
                            <a class="product-info-page-link" href="product-info.html" data-id="${product.id}">
                                <div class="product__item-image">
                                    <img src="${product.image}" alt="${product.title}">
                                </div>
                                <div class="product__item-name">${product.title}</div>
                            </a>
                            <div class="product__item-price">${product.price} ${product.currency}</div>
                            <div class="product__item-btn small-btn"><a href="#">Buy Now</a></div>
                        </div>
                    </div>
                `;
            });
        });
    });
}
// ------------------------------------------------------------------------------------------------


renderProducts(".categories__items", 12, true, [], [], [], false, [], 0)
loadAdditionProducts();
displayProductsCategories(categoryProperties, ".filters__navbar")
initAccordion()