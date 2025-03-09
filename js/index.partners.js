const track = document.querySelector(".partners__track");
const prevBtn = document.getElementById("p-btn");
const nextBtn = document.getElementById("n-btn");
const itemWidth = document.querySelector(".partners__item").offsetWidth + 20;

prevBtn.onclick = () => {
  track.prepend(track.lastElementChild);
  track.style.transition = 'none';
  track.style.transform = `translateX(-${itemWidth}px)`;
  requestAnimationFrame(() => {
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = 'translateX(0)';
  });
};

nextBtn.onclick = () => {
  track.style.transition = 'transform 0.5s ease';
  track.style.transform = `translateX(-${itemWidth}px)`;
  setTimeout(() => {
    track.append(track.firstElementChild);
    track.style.transition = 'none';
    track.style.transform = 'translateX(0)';
  }, 500);
};
