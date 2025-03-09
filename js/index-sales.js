import { renderProducts } from "./render-products.js";

renderProducts(".slider__items", 5, true, ["Sale"], [""]).then(() => {
    const slider = document.querySelector(".slider__container");
    const sliderItemsContainer = document.querySelector(".slider__items");
    const prevBtn = document.querySelector(".slider__btn-prev");
    const nextBtn = document.querySelector(".slider__btn-next");

    prevBtn.addEventListener("click", () => showSlider("prev"));
    nextBtn.addEventListener("click", () => showSlider("next"));

    function showSlider(type) {
        let items = sliderItemsContainer.children;

        if (items.length === 0) return;

        if (type === "next") {
            sliderItemsContainer.appendChild(items[0]);
            slider.classList.add("next");
            console.log("NEXT CLICK");
        } else {
            sliderItemsContainer.prepend(items[items.length - 1]);
            slider.classList.add("prev");
            console.log("PREV CLICK");
        }

        setTimeout(() => {
            slider.classList.remove("next", "prev");
        }, 300);
    }
});
