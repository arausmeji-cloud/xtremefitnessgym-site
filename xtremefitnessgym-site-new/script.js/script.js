// Menú que aparece al subir y desaparece al bajar
let lastScrollY = window.scrollY;
const header = document.getElementById("main-header");

window.addEventListener("scroll", () => {
  const current = window.scrollY;

  if (current > lastScrollY && current > 80) {
    // bajando
    header.classList.add("hidden");
  } else {
    // subiendo
    header.classList.remove("hidden");
  }

  lastScrollY = current;
});

// Menú mobile
const navToggle = document.getElementById("nav-toggle");
const nav = document.querySelector(".nav");

navToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// Cerrar menú mobile al hacer click en un link
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

// Año automático en el footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}