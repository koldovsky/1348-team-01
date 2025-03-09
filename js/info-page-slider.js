import { renderProducts } from "./render-products.js";

function showPropositionsSlider(){
    const product = JSON.parse(localStorage.product || '{}')

    const productCategory = product.category;
    console.log("sfsfsfs",productCategory, typeof productCategory);


    renderProducts(".propositions__slider-container", 10, true, ["New", "Sale"], ["in stock", "pre order"], [productCategory], true, [product.id]).then(() => {
        const slider = document.querySelector(".propositions__slider-container");
        // const sliderItemsContainer = document.querySelector(".slider__items");
        const prevBtn = document.querySelector(".propositions__slider-prev-btn");
        const nextBtn = document.querySelector(".propositions__slider-next-btn");

        prevBtn.addEventListener("click", () => showSlider("prev"));
        nextBtn.addEventListener("click", () => showSlider("next"));

        function showSlider(type) {
            let items = slider.children;

            if (items.length === 0) return;

            if (type === "next") {
                slider.appendChild(items[0]);
                slider.classList.add("next");
                console.log("NEXT CLICK");
            } else {
                slider.prepend(items[items.length - 1]);
                slider.classList.add("prev");
                console.log("PREV CLICK");
            }

            setTimeout(() => {
                slider.classList.remove("next", "prev");
            }, 300);
        }
        })


}



showPropositionsSlider();