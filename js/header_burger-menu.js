import {linksNavigation} from "./header-navigation.js"

const burger = document.querySelector(".header__burger");
const menu = document.querySelector(".header__main");
const body = document.querySelector("body");
const navSocials = document.querySelector(".header__info-social");
const navItems = document.querySelector(".header__main-items");
const links = Array.from(document.querySelectorAll(".header__main-item"));
console.log(links);

linksNavigation(links)

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  menu.classList.toggle("active");
  body.classList.toggle("lock");
  navItems.classList.toggle("active");
  navSocials.classList.toggle("active");
});

for (const link of links) {
  link.addEventListener("click", () => {
    console.log("click");
    burger.classList.remove("active");
    menu.classList.remove("active");
    body.classList.remove("lock");
    navItems.classList.remove("active");
    navSocials.classList.remove("active");    
  });
}
