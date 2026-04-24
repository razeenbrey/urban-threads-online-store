import { db } from "../firebase";
import { doc, writeBatch } from "firebase/firestore";

// Some demo objects for the store
export const products = [
  {
    name: "Oversized Hoodie",
    price: 49.99,
    category: "Hoodies",
    description: "Soft cotton hoodie in oversized fit with embroidered logo.",
    imageURL: "https://neutral.com/cdn/shop/files/T63111_Tiger_Cotton_Oversize_Hoodie_0004_9ce79d7c-514f-4582-a4d3-e15394d540c6.jpg?v=1770291941"
  },
  {
    name: "Classic Pullover Hoodie",
    price: 44.99,
    category: "Hoodies",
    description: "Classic pullover style with front pocket and adjustable hood.",
    imageURL: "https://thefoschini.vtexassets.com/arquivos/ids/224279977-1200-1600?v=639071749365170000&width=1200&height=1600&aspect=true"
  },
  {
    name: "Zip-Up Streetwear Hoodie",
    price: 54.99,
    category: "Hoodies",
    description: "Full-zip hoodie with urban streetwear design and side pockets.",
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgpjiqJJZauuoOY1DcxeZUYvk7SgKRIqjnvA&s"
  },
  {
    name: "Vintage Wash T-shirt",
    price: 24.99,
    category: "T-shirts",
    description: "Relaxed fit t-shirt with vintage wash and graphic print.",
    imageURL: "https://img.kwcdn.com/product/fancy/11a41a3d-4aaa-4066-961f-de67b2530c48.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp"
  },
  {
    name: "Boxy Crop Tee",
    price: 22.99,
    category: "T-shirts",
    description: "Trendy cropped t-shirt with boxy silhouette and soft fabric.",
    imageURL: "https://thefoschini.vtexassets.com/arquivos/ids/222112638-1200-1600?v=638995272980230000&width=1200&height=1600&aspect=true"
  },
  {
    name: "Graphic Street Tee",
    price: 27.99,
    category: "T-shirts",
    description: "Bold graphic print t-shirt made from 100% organic cotton.",
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPx_L0QVpyMy-cQE1ag2NWOwlY9KtzCMwqBA&s"
  },
  {
    name: "Classic Low-Top Sneakers",
    price: 79.99,
    category: "Sneakers",
    description: "Minimalist low-top sneakers with cushioned insole and durable sole.",
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRHj_fPUgIesaPucg5N_TX1Ghg-utZakNUYg&s"
  },
  {
    name: "Chunky Platform Sneakers",
    price: 89.99,
    category: "Sneakers",
    description: "Bold chunky sneakers with platform sole and retro design.",
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxfmC1_6YImjFwgbO7Rwn5QgX8oiVTwCPfZQ&s"
  },
  {
    name: "High-Top Canvas Sneakers",
    price: 69.99,
    category: "Sneakers",
    description: "Classic high-top sneakers in durable canvas with lace-up closure.",
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRge7p4QX7P6m_bocTGVOIiMHPC8DLdOpDqGA&s"
  },
  {
    name: "Baseball Cap",
    price: 19.99,
    category: "Accessories",
    description: "Adjustable cotton baseball cap with embroidered logo.",
    imageURL: "https://hatstore.imgix.net/4063633135545_1.jpg"
  },
  {
    name: "Crossbody Phone Bag",
    price: 29.99,
    category: "Accessories",
    description: "Compact crossbody bag perfect for phone and small essentials.",
    imageURL: "https://assets.aspinaloflondon.com/cdn-cgi/image/fit=crop%2Cformat=auto%2Cquality=85%2Cwidth=650%2Cheight=650/images/original/306724-011-2787-14110000-11.jpg"
  },
  {
    name: "Beanie Hat",
    price: 17.99,
    category: "Accessories",
    description: "Warm knit beanie with cuff and urban style patch.",
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVQ_jN14DiCoNIskkKLdUPtfJH6TLRBN4IHg&s"
  }
];

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export async function seedProducts() {
  const batch = writeBatch(db);

  products.forEach((product) => {
    const productId = slugify(product.name);
    const ref = doc(db, "products", productId);
    batch.set(ref, product, { merge: true });
  });

  await batch.commit();
  return `${products.length} products seeded successfully.`;
}