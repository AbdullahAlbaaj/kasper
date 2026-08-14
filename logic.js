const nav = document.querySelector("nav");
const burger = document.querySelector(".toggle-list");
const links = document.querySelectorAll("nav ul li a");

const landing = document.querySelector(".landing");
const landBullets = document.querySelectorAll(".landing ul.bullets li");
const slides = ["landing1.png", "landing2.jpg", "landing3.png"];
const leftArrow = document.querySelector(".landing .arrow-left");
const rightArrow = document.querySelector(".landing .arrow-right");
let isTransitioning = false;
let current = 1;

const filterOptions = document.querySelectorAll(".portfolio .filter-options li");
const portfolioItems = document.querySelectorAll(".portfolio .imgs-container .image");

const stats = document.querySelector(".stats");
const statsNums = document.querySelectorAll(".stats .number");

const skills = document.querySelector(".our-skills .skills");
const progSpans = document.querySelectorAll(".our-skills .prog-holder .prog span");
let started = false;
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry) => {
    if (entry.target === skills && entry.isIntersecting) {
      progSpans.forEach((span) => span.style.width = span.dataset.prog);
      observer.unobserve(entry.target);
    }
    if (entry.target === stats && entry.isIntersecting) {
      if (started === false) {
        started = true;
        statsNums.forEach((num) => {
          const interval = setInterval(() => {
            if (+num.textContent < +num.dataset.num) {
              num.textContent++;
            } else {
              clearInterval(interval);
            }
          }, 10);
        });
      }
      observer.unobserve(entry.target);
    }
  });
});

const dateSpan = document.getElementById("date");
dateSpan.textContent = new Date().getFullYear();

const contactForm = document.querySelector(".contact .content form");
const contactName = document.querySelector("#name");
const contactEmail = document.querySelector("#email");
const contactMes = document.querySelector("#message");

observer.observe(stats);
observer.observe(skills);

document.querySelector(".landing .current").style.backgroundImage = `url(../images/${slides[current]})`;

burger.addEventListener("click", function () {
  nav.classList.toggle("active");
});

links.forEach((link) => {
  link.addEventListener("click", function () {
    links.forEach((link) => link.classList.remove("active"));
    this.classList.add("active");
  });
});

document.addEventListener("click", function (e) {
  if (! e.target.closest(".toggle-list")) {
    nav.classList.remove("active");
  }
});

leftArrow.addEventListener('click', prevSlide);
rightArrow.addEventListener('click', nextSlide);
landBullets.forEach((b, i) => {
  b.addEventListener("click", () => showSlide(i));
});

filterOptions.forEach((filter) => {
  filter.addEventListener('click', function (e) {
    const filter = e.currentTarget.dataset.filter;
    document.querySelector(".portfolio .filter-options .active").classList.remove("active");
    e.currentTarget.classList.add("active");
    portfolioItems.forEach((item) => item.classList.toggle("hidden", filter !== 'all' && item.dataset.category !== e.currentTarget.dataset.filter));
  });
});

contactForm.addEventListener('submit', (e) => {
  if (contactName.value.trim() === '' || contactEmail.value.trim() === '' || contactMes.value.trim() === '' || !contactEmail.checkValidity()) {
    e.preventDefault();
  }
});

function showSlide(index) {
  if (isTransitioning || index === current) return;
  isTransitioning = true;
  const cur = document.querySelector(".landing .current");
  const next = document.querySelector(".landing .next");
  next.style.backgroundImage = `url(./images/${slides[index]})`;
  next.style.opacity = 1;
  cur.style.opacity = 0;

  next.addEventListener("transitionend", function () {
    next.classList.remove('next');
    next.classList.add('current');
    cur.classList.remove('current');
    cur.classList.add('next');
    isTransitioning = false;
    current = index;
  }, {once: true});
  document.querySelector(".landing ul.bullets li.active").classList.remove("active");
  landBullets[index].classList.add("active");
}

function nextSlide() {
  let index = (current + 1) % slides.length;
  showSlide(index);
}

function prevSlide() {
  let index = (current - 1 + slides.length) % slides.length;
  showSlide(index);
}