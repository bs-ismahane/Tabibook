//nav
const navBtn = document.querySelector(".nav-btn");
const navBar = document.querySelector(".navbar");

navBtn.addEventListener("click", function () {
    if (navBtn.classList.contains("active")) {
        navBtn.classList.remove("active");
        navBar.classList.remove("active"); 
        navBtn.innerHTML = `<i class="fa-solid fa-bars"></i>`; 
    } else {
        navBtn.classList.add("active");
        navBar.classList.add("active");
        navBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    }
});