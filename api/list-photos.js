import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const folder = (req.query.folder || "").toString().toLowerCase();

    // Seguridad: solo permitimos estas carpetas
    const allowed = new Set(["bjj", "gym", "impact"]);
    if (!allowed.has(folder)) {
      return res.status(400).json({ error: "Invalid folder" });
    }

    // Ruta a /public/images/gallery/<folder>
    const dirPath = path.join(process.cwd(), "public", "images", "gallery", folder);

    if (!fs.existsSync(dirPath)) {
      return res.status(200).json([]); // carpeta vacía o no existe aún
    }

    const files = fs.readdirSync(dirPath);

    // Filtrar solo imágenes
    const images = files
      .filter((f) => /\.(png|jpe?g|gif|webp|jfif)$/i.test(f))
      // Ordenar (opcional, pero ayuda)
      .sort((a, b) => a.localeCompare(b));

    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
}
