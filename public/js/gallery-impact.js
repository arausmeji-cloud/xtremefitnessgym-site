document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("impact-container");
  if (!container) return;

  const photos = [
    "impact-1.jpg",
    "impact-2.jpg",
    "impact-3.jpg",
    "impact-4.jpg",
    "impact-5.jpg",
    "impact-6.jpg",
    "impact-7.jpg",
    "impact-8.jpg",
    "impact-9.jpg"
  ];

  photos.forEach((file) => {
    const img = document.createElement("img");
    img.src = `/images/gallery/impact/${file}`;
    img.className = "gallery-thumb";
    container.appendChild(img);
  });
});
