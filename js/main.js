'use strict';
// preload
const preloader =document.querySelector("[data-preload]");
window.addEventListener("load",function(){
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
})
// hero
const hero = document.querySelector(".hero");
const bg = ['./images/image1.jpg', './images/image2.jpg', './images/image3.jpg'];
const btn_prev = document.querySelector(".prev");
const btn_next = document.querySelector(".next");
let index = 0;

function updateBackground() {
        hero.style.backgroundImage = `url('${bg[index]}')`; // Change image
}

function autoScroll() {
    index = (index + 1) % bg.length;
    updateBackground();
}

window.addEventListener("load", function () {
    updateBackground();
    setInterval(autoScroll, 5000);
});

btn_prev.addEventListener("click", function () {
    index = (index - 1 + bg.length) % bg.length;
    updateBackground();
});

btn_next.addEventListener("click", function () {
    index = (index + 1) % bg.length;
    updateBackground();
});
// Testimonials
const reviewsContainer = document.querySelector('.reviews .review');
const reviews = document.querySelector('.reviews');
const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');

const reviewWidth = reviewsContainer.clientWidth; // Get screen width
let scrollAmount = 0;

function scrollByLeft() {
    if (scrollAmount === 0) {
        scrollAmount = reviews.scrollWidth - reviewWidth; // Jump to last
    } else {
        scrollAmount -= reviewWidth;
    }
    reviews.style.transform = `translateX(-${scrollAmount}px)`;
}

function scrollByRight() {
    if (scrollAmount >= reviews.scrollWidth - reviewWidth) {
        scrollAmount = 0;
    } else {
        scrollAmount += reviewWidth;
    }
    reviews.style.transform = `translateX(-${scrollAmount}px)`;
}

leftBtn.addEventListener('click', scrollByLeft);
rightBtn.addEventListener('click', scrollByRight);

// Auto-scroll every 5 seconds
setInterval(scrollByRight, 8000);
