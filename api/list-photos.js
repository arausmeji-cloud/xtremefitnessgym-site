const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  const folder = req.query.folder;

  if (!folder) {
    return res.status(400).json({ error: "Missing folder parameter" });
  }

  const imagesPath = path.join(process.cwd(), "public", "images", "gallery", folder);

  try {
    const files = fs.readdirSync(imagesPath);

    const photos = files.filter(f =>
      f.endsWith(".jpg") ||
      f.endsWith(".jpeg") ||
      f.endsWith(".png") ||
      f.endsWith(".webp")
    );

    return res.status(200).json(photos);
  } catch (error) {
    return res.status(500).json({ error: "Folder not found" });
  }
};
