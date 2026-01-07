document.addEventListener("DOMContentLoaded", async () => {
  const folder = "bjj";
  const container = document.getElementById("bjj-container");

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  if (!container) return;

  let photos = [];
  let currentIndex = 0;

  async function loadGallery() {
    try {
      const res = await fetch(`/api/list-photos?folder=${folder}`);
      photos = await res.json();

      container.innerHTML = "";

      if (!Array.isArray(photos) || photos.length === 0) {
        container.innerHTML = `<p style="opacity:.85;">No photos found yet.</p>`;
        return;
      }

      photos.forEach((file, index) => {
        const img = document.createElement("img");
        img.src = `/images/gallery/${folder}/${file}`;
        img.alt = `BJJ Photo ${index + 1}`;
        img.className = "gallery-thumb";
        img.dataset.index = String(index);

        img.addEventListener("click", () => {
          currentIndex = index;
          openLightbox();
        });

        container.appendChild(img);
      });
    } catch (e) {
      console.error("Gallery load error:", e);
      container.innerHTML = `<p style="opacity:.85;">Error loading gallery.</p>`;
    }
  }

  function openLightbox() {
    if (!photos.length) return;
    lightbox.style.display = "flex";
    lightboxImg.src = `/images/gallery/${folder}/${photos[currentIndex]}`;
  }

  function closeLightbox() {
    lightbox.style.display = "none";
  }

  // cerrar si clickeas afuera de la imagen
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    openLightbox();
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % photos.length;
    openLightbox();
  });

  // ESC para cerrar
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  await loadGallery();
});
