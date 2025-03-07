const accordionItems = document.querySelectorAll(".accordion__item")

accordionItems.forEach((item, index) => {
    const title = item.querySelector(".accordion__item-header")
    const description = item.querySelector(".accordion__item-descripton")
    const btn = item.querySelector(".accordion__item-btn")

    title.addEventListener("click", () => {
        btn.classList.toggle("open")
        console.log(description.scrollHeight);
        if (btn.classList.contains("open")) {
            description.style.height = `${description.scrollHeight}px`
        } else {
            description.style.height = `0px`
        }
    })
})