document.addEventListener("DOMContentLoaded", () => {

  let photos = [];
  let currentIndex = 0;
  const folder = "gym";

  const container = document.getElementById("gym-container");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  fetch("/api/list-photos?folder=" + folder)
    .then(res => res.json())
    .then(data => {
      photos = data;

      photos.forEach((file, index) => {
        const img = document.createElement("img");
        img.src = "/images/gallery/" + folder + "/" + file;
        img.className = "gallery-thumb";
        img.dataset.index = index;

        img.addEventListener("click", () => {
          currentIndex = index;
          openLightbox();
        });

        container.appendChild(img);
      });
    });

  function openLightbox() {
    lightbox.style.display = "flex";
    lightboxImg.src = "/images/gallery/" + folder + "/" + photos[currentIndex];
  }

  prevBtn.onclick = e => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    openLightbox();
  };

  nextBtn.onclick = e => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % photos.length;
    openLightbox();
  };

  lightbox.onclick = () => {
    lightbox.style.display = "none";
  };

});
