const filters = document.querySelectorAll(".filter");

filters.forEach(f => {
  f.addEventListener("click", () => {
    filters.forEach(x => x.classList.remove("active"));
    f.classList.add("active");
  });
});

const container = document.getElementById("filters-container");

document.querySelector(".left-btn").onclick = () => {
  container.scrollBy({ left: -200, behavior: "smooth" });
};

document.querySelector(".right-btn").onclick = () => {
  container.scrollBy({ left: 200, behavior: "smooth" });
};
