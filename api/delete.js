import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: "da2ucg8ie",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { public_id, admin_secret } = req.body;

  // protect with your secret
  if (admin_secret !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ success: false, message: "Unauthorized" });
  }

  try {
    const result = await cloudinary.v2.uploader.destroy(public_id);
    res.json({ success: true, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
}