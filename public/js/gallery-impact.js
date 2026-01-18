document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("impact-container");
container.innerHTML = "";
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  let photos = [];
  let currentIndex = 0;
  const folder = "impact";

  fetch("/api/list-photos?folder=" + folder)
    .then(response => response.json())
    .then(data => {
      photos = data;

      if (!photos.length) {
        container.innerHTML = "<p style=\"opacity:.7\">No photos found.</p>";
        return;
      }

      photos.forEach((file, index) => {
        const img = document.createElement("img");
        img.src = "/images/gallery/" + folder + "/" + file;
        img.alt = "Impact Photo " + (index + 1);
        img.className = "gallery-thumb";
        img.dataset.index = index;

        img.addEventListener("click", function () {
          currentIndex = index;
          openLightbox();
        });

        container.appendChild(img);
      });
    })
    .catch(() => {
      container.innerHTML = "<p>Error loading gallery.</p>";
    });

  function openLightbox() {
    lightbox.style.display = "flex";
    lightboxImg.src = "/images/gallery/" + folder + "/" + photos[currentIndex];
  }

  prevBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    openLightbox();
  });

  nextBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % photos.length;
    openLightbox();
  });

  lightbox.addEventListener("click", function () {
    lightbox.style.display = "none";
  });
});
