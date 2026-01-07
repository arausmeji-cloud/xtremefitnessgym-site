import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { folder } = req.query;

  if (!folder) {
    return res.status(400).json([]);
  }

  const galleryPath = path.join(
    process.cwd(),
    "public",
    "images",
    "gallery",
    folder
  );

  try {
    const files = fs
      .readdirSync(galleryPath)
      .filter(file =>
        /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
      );

    res.status(200).json(files);
  } catch (err) {
    console.error("Gallery API error:", err);
    res.status(200).json([]);
  }
}
