document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("bjj-container");
  if (!container) return;

  const imagesPath = "/images/gallery/bjj/";

  fetch(imagesPath)
    .then(() => {
      const images = Array.from(container.querySelectorAll("img"));
      console.log("BJJ gallery ready");
    })
    .catch(err => console.error(err));
});
