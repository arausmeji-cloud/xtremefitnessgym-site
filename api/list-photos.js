import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const folder = req.query.folder;

    if (!folder) {
      return res.status(400).json({ error: "Folder not specified" });
    }

    const basePath = path.join(
      process.cwd(),
      "public",
      "images",
      "gallery",
      folder
    );

    if (!fs.existsSync(basePath)) {
      return res.status(404).json({ error: "Folder not found" });
    }

    const files = fs.readdirSync(basePath);

    const images = files.filter(file => {
      const lower = file.toLowerCase();
      return (
        lower.endsWith(".jpg") ||
        lower.endsWith(".jpeg") ||
        lower.endsWith(".png") ||
        lower.endsWith(".webp") ||
        lower.endsWith(".jfif")
      );
    });

    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
