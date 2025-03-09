function showProductInfo() {
    const product = JSON.parse(localStorage.product || '{}');
    if (!product) {
        console.log("ERORRR, there is no JSON");
        return
    } else {
        console.log("JSON is :", product);
        
    };
    document.querySelector(".page-title").innerText = product.title;
    const category = document.querySelector('.bradcrumb__category-link')
    category.innerText = product.category;
    category.setAttribute("href", `${product.category}.html`)
    document.querySelector(".product-info__img").setAttribute("src", product.image)
    document.querySelector('.product-info__title').innerText = product.title;
    const stock = document.querySelector('.product-info__stock')
    stock.innerText = product.stock;
    if (product.stock === "out of stock") {
        stock.style.color = "#cc3833"
    }
    
    document.querySelector('.product-info__code').innerText = "Product code " + product.id;
    const price = document.querySelector('.without-sale')
    price.innerText = product.price;

    if (product.percentage) {
        document.querySelector('.with-sale').innerText = (product.price - Math.floor(product.percentage / 100 * product.price)).toFixed(2);
        price.style.textDecoration = "line-through";
    }


    // Amount buttons

    const amountInput = document.querySelector(".quantity-input input")
    const plusBtn = document.querySelector(".quantity-input .up-btn")
    const minusBtn = document.querySelector(".quantity-input .down-btn")

    let currentAmountValue = parseInt(amountInput.value)

    plusBtn.addEventListener("click", () => {
        if (currentAmountValue < 0) return
        currentAmountValue += 1;
        amountInput.value = currentAmountValue;
    })

    minusBtn.addEventListener("click", () => {
        if (currentAmountValue <= 0) return
        currentAmountValue -= 1;
        amountInput.value = currentAmountValue;
    })
  

    // TABS

    const tabButtons = document.querySelectorAll(".tab-item__header");
    const tabContents = document.querySelectorAll(".tab-item");

    tabButtons[0].classList.add("active");
    tabContents[0].classList.add("active");

    tabButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            button.classList.add("active");
            tabContents[index].classList.add("active");
        });
    });

    const description = document.querySelector(".tab-item__description p");
    if (description && product.description) {
        description.innerText = product.description;
    }

    const categoryProperties = {
        "mouse": {
            "DPI": product.dpi,
            "Sensor": product.sensor,
            "Connection": product.connection,
            "Color": product.color
        },
        "monitor": {
            "Diagonal": product.diagonal,
            "Panel Type": product.panel_type,
            "Response Time": product.responseTime,
            "Refresh Rate": product.refreshRate,
            "Resolution": product.resolution,
            "Color": product.color
        },
        "keyboard": {
            "Type": product.type,
            "Switches": product.switches,
            "Special Feature": product.specialFeature,
            "Color": product.color
        },
        "headset": {
            "Sensitivity": product.sensitivity,
            "Impedance": product.impedance,
            "Frequency Range": product.frequencyRange,
            "Color": product.color
        }
    };

    const characteristicsContainer = document.querySelector(".characteristics");
    characteristicsContainer.innerHTML = "";

    const properties = categoryProperties[product.category] || {};
    for (const key in properties) {
        const value = properties[key];

        const characteristicItem = document.createElement("div");
        characteristicItem.classList.add("characteristics-item");

        const propertyDiv = document.createElement("div");
        propertyDiv.classList.add("characteristic-property");
        propertyDiv.innerHTML = `<p>${key}</p>`;

        const valueDiv = document.createElement("div");
        valueDiv.classList.add("characteristic-value");
        valueDiv.innerHTML = `<p>${value}</p>`;

        characteristicItem.appendChild(propertyDiv);
        characteristicItem.appendChild(valueDiv);
        characteristicsContainer.appendChild(characteristicItem);
    }

}



showProductInfo();