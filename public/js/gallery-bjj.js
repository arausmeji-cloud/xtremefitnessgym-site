document.addEventListener("DOMContentLoaded", function () {

  var folder = "bjj";
  var container = document.getElementById("bjj-container");

  var photos = [
    "bjj-1.jpg",
    "bjj-2.jpg",
    "bjj-3.jpg",
    "bjj-4.jpg",
    "bjj-5.jpg",
    "bjj-6.jpg",
    "bjj-7.jpg",
    "bjj-8.jpg",
    "bjj-9.jpg"
  ];

  if (!container) return;

  photos.forEach(function (file, index) {
    var img = document.createElement("img");
    img.src = "/images/gallery/" + folder + "/" + file;
    img.alt = "BJJ Photo " + (index + 1);
    img.className = "gallery-thumb";
    container.appendChild(img);
  });

});
