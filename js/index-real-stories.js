const items = document.querySelectorAll(".real-stories__item");
let currentIndex = 0;

const updateSlide = () => {
  items.forEach((item, index) => {
    item.classList.toggle("active", index === currentIndex);
  });
};

document.getElementById("prev-btn").onclick = () => {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  updateSlide();
};

document.getElementById("next-btn").onclick = () => {
  currentIndex = (currentIndex + 1) % items.length;
  updateSlide();
};

updateSlide();
