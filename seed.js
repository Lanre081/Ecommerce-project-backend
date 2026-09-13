/**
 * ShopEase Store — Full Product Seeder
 * Run with: npm run seed  (or: node seed.js)
 *
 * Seeds: 10 categories + 60 products
 * Prices in NGN (Naira)
 */

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const CATEGORIES = [
  { name: "Electronics", slug: "electronics" },
  { name: "Phones & Tablets", slug: "phones-tablets" },
  { name: "Computers", slug: "computers" },
  { name: "Fashion", slug: "fashion" },
  { name: "Shoes", slug: "shoes" },
  { name: "Home & Kitchen", slug: "home-kitchen" },
  { name: "Beauty", slug: "beauty" },
  { name: "Sports & Fitness", slug: "sports-fitness" },
  { name: "Baby Products", slug: "baby-products" },
  { name: "Grocery", slug: "grocery" },
];

const PRODUCTS = [
  // ── ELECTRONICS ────────────────────────────────
  {
    cat: "Electronics",
    name: "Samsung 55\" QLED 4K Smart TV",
    brand: "Samsung",
    price: 350000,
    discountPrice: 295000,
    stock: 12,
    isFeatured: true,
    isBestSeller: true,
    description: "Experience stunning 4K visuals with Quantum Dot technology. Smart TV with built-in Netflix, YouTube and more.",
    images: [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&q=80",
      "https://images.unsplash.com/photo-1571415060716-baff5f717c37?w=500&q=80",
    ],
    specifications: { "Screen Size": "55 inches", "Resolution": "4K UHD (3840×2160)", "Smart TV": "Yes", "Ports": "4x HDMI, 3x USB", "Refresh Rate": "120Hz" },
  },
  {
    cat: "Electronics",
    name: "JBL Flip 6 Bluetooth Speaker",
    brand: "JBL",
    price: 42000,
    discountPrice: 35000,
    stock: 45,
    isFeatured: true,
    isFlashSale: true,
    description: "Powerful sound in a compact, waterproof package. 12-hour playtime, IP67 waterproof rating.",
    images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80"],
    specifications: { "Battery Life": "12 hours", "Waterproof": "IP67", "Connectivity": "Bluetooth 5.1", "Weight": "550g" },
  },
  {
    cat: "Electronics",
    name: "Sony WH-1000XM5 Noise Cancelling Headphones",
    brand: "Sony",
    price: 180000,
    discountPrice: 155000,
    stock: 8,
    isFeatured: true,
    description: "Industry-leading noise cancellation with 30-hour battery life. Perfect for work and travel.",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"],
    specifications: { "Battery Life": "30 hours", "ANC": "Yes (industry-leading)", "Weight": "250g", "Connectivity": "Bluetooth 5.2" },
  },
  {
    cat: "Electronics",
    name: "Anker PowerCore 20000mAh Power Bank",
    brand: "Anker",
    price: 28000,
    discountPrice: 22000,
    stock: 120,
    isBestSeller: true,
    isFlashSale: true,
    description: "Charge your phone 5+ times with 20,000mAh capacity. Dual USB-A + USB-C output.",
    images: ["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&q=80"],
    specifications: { "Capacity": "20,000mAh", "Ports": "2x USB-A, 1x USB-C", "Fast Charge": "Yes (18W)", "Weight": "356g" },
  },
  {
    cat: "Electronics",
    name: "Samsung Galaxy Watch 6 (44mm)",
    brand: "Samsung",
    price: 135000,
    discountPrice: 115000,
    stock: 20,
    isFeatured: true,
    description: "Advanced health tracking with body composition, sleep coaching and GPS.",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80"],
    specifications: { "Display": "1.5\" Super AMOLED", "Battery": "40mAh (up to 40 hrs)", "Health": "Heart rate, SpO2, body comp", "Waterproof": "5ATM" },
  },
  {
    cat: "Electronics",
    name: "Apple AirPods Pro (2nd Gen)",
    brand: "Apple",
    price: 165000,
    discountPrice: 145000,
    stock: 15,
    isFeatured: true,
    isBestSeller: true,
    description: "Up to 2x more Active Noise Cancellation. Adaptive Transparency. Personalized Spatial Audio.",
    images: ["https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&q=80"],
    specifications: { "ANC": "Yes (Adaptive)", "Battery (case)": "30 hours total", "Chip": "Apple H2", "Water Resistance": "IPX4" },
  },
  {
    cat: "Electronics",
    name: "Xiaomi Mi True Wireless Earbuds Basic 2",
    brand: "Xiaomi",
    price: 18500,
    discountPrice: 14000,
    stock: 200,
    isFlashSale: true,
    description: "Affordable true wireless earbuds with 20-hour total battery life and comfortable fit.",
    images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80"],
    specifications: { "Battery (buds)": "4 hours", "Battery (case)": "16 hours", "Connectivity": "Bluetooth 5.0", "Driver": "8mm" },
  },

  // ── PHONES & TABLETS ───────────────────────────
  {
    cat: "Phones & Tablets",
    name: "Samsung Galaxy S24 Ultra 256GB",
    brand: "Samsung",
    price: 650000,
    discountPrice: 599000,
    stock: 5,
    isFeatured: true,
    isBestSeller: true,
    description: "The ultimate Galaxy experience with built-in S Pen, 200MP camera, and powerful AI features.",
    images: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80"],
    specifications: { "Screen": "6.8\" Dynamic AMOLED 2X", "RAM": "12GB", "Storage": "256GB", "Camera": "200MP main", "Battery": "5000mAh", "OS": "Android 14" },
    variants: [{ name: "Color", options: ["Titanium Black", "Titanium Violet", "Titanium Gray"] }],
  },
  {
    cat: "Phones & Tablets",
    name: "iPhone 15 Pro 128GB",
    brand: "Apple",
    price: 890000,
    discountPrice: 850000,
    stock: 3,
    isFeatured: true,
    description: "Titanium design, A17 Pro chip, Pro camera system with 5x optical zoom.",
    images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80"],
    specifications: { "Screen": "6.1\" Super Retina XDR", "Chip": "A17 Pro", "Storage": "128GB", "Camera": "48MP ProRAW", "Battery": "All-day" },
    variants: [{ name: "Color", options: ["Black Titanium", "White Titanium", "Blue Titanium"] }],
  },
  {
    cat: "Phones & Tablets",
    name: "Tecno Phantom X2 Pro 256GB",
    brand: "Tecno",
    price: 310000,
    discountPrice: 265000,
    stock: 18,
    isFeatured: true,
    isBestSeller: true,
    description: "Nigeria's favourite premium phone with retractable portrait lens and stunning 6.8\" AMOLED.",
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80"],
    specifications: { "Screen": "6.8\" AMOLED, 120Hz", "RAM": "12GB", "Storage": "256GB", "Battery": "5160mAh", "Charging": "45W" },
    variants: [{ name: "Color", options: ["Stardust Grey", "Mars Orange"] }],
  },
  {
    cat: "Phones & Tablets",
    name: "Infinix Note 40 Pro 256GB",
    brand: "Infinix",
    price: 145000,
    discountPrice: 119000,
    stock: 30,
    isFlashSale: true,
    description: "Large 5000mAh battery, 45W charging, and AMOLED display at an unbeatable price.",
    images: ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&q=80"],
    specifications: { "Screen": "6.78\" AMOLED, 120Hz", "RAM": "8GB", "Storage": "256GB", "Battery": "5000mAh", "Charging": "45W" },
  },
  {
    cat: "Phones & Tablets",
    name: "Samsung Galaxy Tab S9 11\"",
    brand: "Samsung",
    price: 480000,
    discountPrice: 419000,
    stock: 6,
    isFeatured: true,
    description: "Premium Android tablet with Dynamic AMOLED 2X display, S Pen included.",
    images: ["https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&q=80"],
    specifications: { "Screen": "11\" Dynamic AMOLED 2X", "Chip": "Snapdragon 8 Gen 2", "RAM": "8GB", "S Pen": "Included" },
  },
  {
    cat: "Phones & Tablets",
    name: "Xiaomi Redmi Note 13 Pro 256GB",
    brand: "Xiaomi",
    price: 175000,
    discountPrice: 149000,
    stock: 25,
    isBestSeller: true,
    isFlashSale: true,
    description: "200MP camera, 120Hz AMOLED screen, and 67W fast charging at an amazing price.",
    images: ["https://images.unsplash.com/photo-1592899677977-9c10002761d5?w=500&q=80"],
    specifications: { "Screen": "6.67\" AMOLED, 120Hz", "Camera": "200MP", "RAM": "8GB", "Battery": "5000mAh", "Charging": "67W" },
  },

  // ── COMPUTERS ─────────────────────────────────
  {
    cat: "Computers",
    name: "HP Pavilion 15 Laptop (Intel i5, 8GB RAM, 512GB SSD)",
    brand: "HP",
    price: 380000,
    discountPrice: 329000,
    stock: 9,
    isFeatured: true,
    description: "Slim and powerful everyday laptop perfect for students and professionals.",
    images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80"],
    specifications: { "Processor": "Intel Core i5-1235U", "RAM": "8GB DDR4", "Storage": "512GB NVMe SSD", "Display": "15.6\" FHD IPS", "OS": "Windows 11" },
  },
  {
    cat: "Computers",
    name: "MacBook Air M2 (8GB, 256GB)",
    brand: "Apple",
    price: 1100000,
    discountPrice: 980000,
    stock: 4,
    isFeatured: true,
    description: "Supercharged by M2 chip. Fanless design. All-day battery. The ultimate everyday laptop.",
    images: ["https://images.unsplash.com/photo-1611186871525-9da6b0b81c70?w=500&q=80"],
    specifications: { "Chip": "Apple M2", "RAM": "8GB Unified Memory", "Storage": "256GB SSD", "Display": "13.6\" Liquid Retina", "Battery": "Up to 18 hours" },
    variants: [{ name: "Color", options: ["Midnight", "Starlight", "Space Gray", "Silver"] }],
  },
  {
    cat: "Computers",
    name: "HP 24\" Full HD LED Monitor",
    brand: "HP",
    price: 85000,
    discountPrice: 72000,
    stock: 22,
    isBestSeller: true,
    description: "Crystal-clear 1080p IPS panel with ultra-slim bezels. Perfect for home office.",
    images: ["https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&q=80"],
    specifications: { "Size": "24 inches", "Resolution": "1920×1080 FHD", "Panel": "IPS", "Refresh Rate": "75Hz", "Ports": "VGA, HDMI" },
  },
  {
    cat: "Computers",
    name: "Logitech MX Keys Advanced Wireless Keyboard",
    brand: "Logitech",
    price: 42000,
    discountPrice: 36000,
    stock: 35,
    description: "Smart illuminated keyboard with perfect typing performance. Multi-device pairing.",
    images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80"],
    specifications: { "Connectivity": "Bluetooth/USB receiver", "Backlit": "Yes (adaptive)", "Battery": "Up to 10 days", "Compatibility": "Windows/Mac/Linux" },
  },
  {
    cat: "Computers",
    name: "SanDisk Extreme 1TB Portable SSD",
    brand: "SanDisk",
    price: 65000,
    discountPrice: 55000,
    stock: 40,
    isFlashSale: true,
    description: "Fast portable storage with up to 1050MB/s read speed. Rugged and drop-proof design.",
    images: ["https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&q=80"],
    specifications: { "Capacity": "1TB", "Read Speed": "1050MB/s", "Interface": "USB 3.2 Gen 2", "Durability": "IP55 water/dust resistant" },
  },

  // ── FASHION ───────────────────────────────────
  {
    cat: "Fashion",
    name: "Polo Ralph Lauren Men's Classic T-Shirt",
    brand: "Polo Ralph Lauren",
    price: 12500,
    discountPrice: 9800,
    stock: 80,
    isBestSeller: true,
    description: "Premium cotton pique polo shirt with iconic Polo pony embroidery.",
    images: ["https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&q=80"],
    variants: [
      { name: "Size", options: ["S", "M", "L", "XL", "XXL"] },
      { name: "Color", options: ["White", "Navy", "Black", "Red"] },
    ],
  },
  {
    cat: "Fashion",
    name: "Levi's 501 Original Fit Jeans",
    brand: "Levi's",
    price: 28000,
    discountPrice: 22000,
    stock: 50,
    isBestSeller: true,
    isFlashSale: true,
    description: "The original jean since 1873. Straight-leg, button fly, iconic style.",
    images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80"],
    variants: [
      { name: "Size", options: ["28×30", "30×30", "32×32", "34×32", "36×32"] },
      { name: "Color", options: ["Dark Blue", "Mid Blue", "Black"] },
    ],
  },
  {
    cat: "Fashion",
    name: "Tommy Hilfiger Classic Oxford Shirt",
    brand: "Tommy Hilfiger",
    price: 18000,
    discountPrice: 14500,
    stock: 45,
    description: "Timeless button-down Oxford shirt in classic fit. Perfect for work or casual wear.",
    images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80"],
    variants: [{ name: "Size", options: ["S", "M", "L", "XL"] }],
  },
  {
    cat: "Fashion",
    name: "Zara Floral Midi Dress",
    brand: "Zara",
    price: 22000,
    discountPrice: 16500,
    stock: 30,
    isFeatured: true,
    description: "Feminine floral print midi dress with adjustable straps. Perfect for any occasion.",
    images: ["https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&q=80"],
    variants: [
      { name: "Size", options: ["XS", "S", "M", "L"] },
    ],
  },
  {
    cat: "Fashion",
    name: "H&M Men's Puffer Jacket",
    brand: "H&M",
    price: 35000,
    discountPrice: 28000,
    stock: 25,
    description: "Warm padded jacket with a stand-up collar and two front pockets.",
    images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80"],
    variants: [
      { name: "Size", options: ["S", "M", "L", "XL", "XXL"] },
      { name: "Color", options: ["Black", "Navy", "Khaki"] },
    ],
  },

  // ── SHOES ─────────────────────────────────────
  {
    cat: "Shoes",
    name: "Nike Air Force 1 '07 Sneakers",
    brand: "Nike",
    price: 38000,
    discountPrice: 32000,
    stock: 40,
    isBestSeller: true,
    isFeatured: true,
    description: "The iconic Air Force 1 with classic leather upper and Air cushioning.",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80"],
    variants: [
      { name: "Size (UK)", options: ["6", "7", "8", "9", "10", "11"] },
      { name: "Color", options: ["White", "Black", "Triple White"] },
    ],
  },
  {
    cat: "Shoes",
    name: "Adidas Ultraboost 22 Running Shoes",
    brand: "Adidas",
    price: 65000,
    discountPrice: 55000,
    stock: 15,
    isFeatured: true,
    description: "Incredible energy return with BOOST midsole. Perfect for running and everyday wear.",
    images: ["https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&q=80"],
    variants: [{ name: "Size (UK)", options: ["7", "8", "9", "10", "11"] }],
  },
  {
    cat: "Shoes",
    name: "Clarks Men's Whiddon Oxford Leather Shoes",
    brand: "Clarks",
    price: 45000,
    discountPrice: 38000,
    stock: 20,
    description: "Classic leather Oxford with cushion-soft footbed. Premium craftsmanship.",
    images: ["https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=500&q=80"],
    variants: [{ name: "Size (UK)", options: ["7", "8", "9", "10", "11"] }],
  },
  {
    cat: "Shoes",
    name: "Birkenstock Arizona Buckle Sandals",
    brand: "Birkenstock",
    price: 28000,
    discountPrice: 23000,
    stock: 35,
    isFlashSale: true,
    description: "Legendary comfort with cork footbed that moulds to your foot. Two-strap classic.",
    images: ["https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&q=80"],
    variants: [
      { name: "Size (EU)", options: ["37", "38", "39", "40", "41", "42", "43"] },
    ],
  },
  {
    cat: "Shoes",
    name: "Timberland Premium 6-Inch Waterproof Boots",
    brand: "Timberland",
    price: 72000,
    discountPrice: 62000,
    stock: 10,
    isBestSeller: true,
    description: "Iconic waterproof nubuck boots. Built to last in any weather.",
    images: ["https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500&q=80"],
    variants: [{ name: "Size (UK)", options: ["7", "8", "9", "10", "11"] }],
  },

  // ── HOME & KITCHEN ────────────────────────────
  {
    cat: "Home & Kitchen",
    name: "Philips Airfryer HD9252 (4.5L)",
    brand: "Philips",
    price: 42000,
    discountPrice: 35000,
    stock: 28,
    isBestSeller: true,
    isFeatured: true,
    description: "Fry, bake, grill and roast with up to 90% less fat. 4.5L family-size capacity.",
    images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=80"],
    specifications: { "Capacity": "4.5 Litres", "Power": "1425W", "Temperature": "Up to 200°C", "Timer": "60 minutes" },
  },
  {
    cat: "Home & Kitchen",
    name: "Kenwood BL900 Series Blender 1000W",
    brand: "Kenwood",
    price: 28000,
    discountPrice: 22500,
    stock: 40,
    description: "Powerful 1000W motor with 1.5L glass jar. Perfect for smoothies, soups and more.",
    images: ["https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&q=80"],
    specifications: { "Power": "1000W", "Jar Capacity": "1.5L Glass", "Speeds": "3 + Pulse", "Blades": "Stainless steel" },
  },
  {
    cat: "Home & Kitchen",
    name: "Bruhm 3-Burner Table Top Gas Cooker",
    brand: "Bruhm",
    price: 48000,
    discountPrice: 38000,
    stock: 20,
    isBestSeller: true,
    description: "Durable stainless steel gas cooker with 3 burners and auto-ignition.",
    images: ["https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=500&q=80"],
    specifications: { "Burners": "3", "Material": "Stainless Steel", "Ignition": "Auto", "Compatible": "LPG/natural gas" },
  },
  {
    cat: "Home & Kitchen",
    name: "Philips Viva Electric Kettle HD9350 (1.7L)",
    brand: "Philips",
    price: 18000,
    discountPrice: 14500,
    stock: 55,
    isFlashSale: true,
    description: "Stainless steel kettle boils 1.7L in under 3 minutes. Auto-shutoff for safety.",
    images: ["https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=500&q=80"],
    specifications: { "Capacity": "1.7 Litres", "Power": "2400W", "Material": "Stainless Steel", "Auto-shutoff": "Yes" },
  },
  {
    cat: "Home & Kitchen",
    name: "Russell Hobbs 2-Slice Stainless Toaster",
    brand: "Russell Hobbs",
    price: 14500,
    discountPrice: 11000,
    stock: 50,
    description: "Wide slots, 6 browning settings, and removable crumb tray for easy cleaning.",
    images: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80"],
    specifications: { "Slots": "2 Wide", "Browning Levels": "6", "Power": "850W", "Crumb Tray": "Yes (removable)" },
  },
  {
    cat: "Home & Kitchen",
    name: "IKEA KALLAX Shelving Unit 4-Cube",
    brand: "IKEA",
    price: 35000,
    discountPrice: 28000,
    stock: 15,
    description: "Versatile 4-cube storage unit. Can be used vertically or horizontally.",
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80"],
    specifications: { "Dimensions": "77x77cm", "Material": "Board", "Load Capacity": "13kg per cube", "Assembly": "Required" },
    variants: [{ name: "Color", options: ["White", "Black-Brown", "Oak Effect"] }],
  },
  {
    cat: "Home & Kitchen",
    name: "Midea 3.5KVA Generator (Key Start)",
    brand: "Midea",
    price: 185000,
    discountPrice: 165000,
    stock: 8,
    isFeatured: true,
    description: "Reliable 3.5KVA petrol generator with key start. Ideal for home backup power.",
    images: ["https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500&q=80"],
    specifications: { "Output": "3.5KVA / 2.8KW", "Engine": "4-stroke OHV", "Tank": "15 Litres", "Start": "Key/Recoil" },
  },

  // ── BEAUTY ────────────────────────────────────
  {
    cat: "Beauty",
    name: "Neutrogena Hydro Boost Water Gel Moisturizer",
    brand: "Neutrogena",
    price: 8500,
    discountPrice: 6800,
    stock: 120,
    isBestSeller: true,
    description: "Lightweight gel-cream with hyaluronic acid instantly hydrates and smooths skin.",
    images: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80"],
    specifications: { "Skin Type": "All skin types", "Size": "50ml", "SPF": "No", "Key Ingredient": "Hyaluronic Acid" },
  },
  {
    cat: "Beauty",
    name: "CeraVe Moisturizing Cream (454g)",
    brand: "CeraVe",
    price: 14000,
    discountPrice: 11000,
    stock: 80,
    isBestSeller: true,
    isFlashSale: true,
    description: "Developed with dermatologists. Rich cream with ceramides and hyaluronic acid.",
    images: ["https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=500&q=80"],
    specifications: { "Size": "454g", "Skin Type": "Dry to very dry", "Fragrance": "Free", "Ceramides": "Yes" },
  },
  {
    cat: "Beauty",
    name: "L'Oreal Paris Total Repair 5 Shampoo 400ml",
    brand: "L'Oreal Paris",
    price: 6500,
    discountPrice: 5200,
    stock: 150,
    description: "Targets 5 hair problems: breakage, dryness, dullness, roughness, and split ends.",
    images: ["https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&q=80"],
  },
  {
    cat: "Beauty",
    name: "Fenty Beauty Pro Filt'r Soft Matte Foundation",
    brand: "Fenty Beauty",
    price: 28000,
    discountPrice: 23500,
    stock: 35,
    isFeatured: true,
    description: "24-hour wear buildable coverage. 50 inclusive shades for all skin tones.",
    images: ["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80"],
    variants: [{ name: "Shade", options: ["100N", "200N", "310N", "380N", "445N", "498N"] }],
  },
  {
    cat: "Beauty",
    name: "Shea Moisture Coconut & Hibiscus Curl Shampoo 384ml",
    brand: "Shea Moisture",
    price: 12000,
    discountPrice: 9500,
    stock: 65,
    description: "Gently cleanses and defines natural curls. Sulfate-free formula with coconut oil.",
    images: ["https://images.unsplash.com/photo-1527799820374-87fbc43e4d57?w=500&q=80"],
  },

  // ── SPORTS & FITNESS ──────────────────────────
  {
    cat: "Sports & Fitness",
    name: "Nike Dri-FIT Men's Training T-Shirt",
    brand: "Nike",
    price: 18000,
    discountPrice: 14000,
    stock: 60,
    isBestSeller: true,
    description: "Moisture-wicking Dri-FIT technology keeps you cool and comfortable during workouts.",
    images: ["https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500&q=80"],
    variants: [
      { name: "Size", options: ["S", "M", "L", "XL", "XXL"] },
    ],
  },
  {
    cat: "Sports & Fitness",
    name: "Adidas Predator Edge Football Boots",
    brand: "Adidas",
    price: 55000,
    discountPrice: 45000,
    stock: 18,
    description: "Control every moment on the pitch with Predator Edge technology.",
    images: ["https://images.unsplash.com/photo-1511886929837-354d827aae26?w=500&q=80"],
    variants: [{ name: "Size (UK)", options: ["7", "8", "9", "10", "11"] }],
  },
  {
    cat: "Sports & Fitness",
    name: "York 50kg Barbell Weight Set with Bar",
    brand: "York",
    price: 65000,
    discountPrice: 55000,
    stock: 10,
    isFeatured: true,
    description: "Complete weight training set with 50kg of plates and a 1.2m chrome barbell.",
    images: ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80"],
    specifications: { "Weight": "50kg total", "Bar Length": "1.2m", "Material": "Cast iron", "Includes": "Collars, bar" },
  },
  {
    cat: "Sports & Fitness",
    name: "Non-Slip Yoga Mat 6mm (183 × 61cm)",
    brand: "Generic",
    price: 12000,
    discountPrice: 8500,
    stock: 100,
    isFlashSale: true,
    description: "Extra-thick 6mm non-slip exercise mat for yoga, pilates, and home workouts.",
    images: ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80"],
    variants: [{ name: "Color", options: ["Purple", "Blue", "Green", "Black", "Pink"] }],
  },
  {
    cat: "Sports & Fitness",
    name: "Spinning Indoor Exercise Bike with LCD Display",
    brand: "Generic",
    price: 185000,
    discountPrice: 155000,
    stock: 5,
    isFeatured: true,
    description: "Heavy-duty flywheel spinning bike with adjustable resistance and LCD display.",
    images: ["https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80"],
    specifications: { "Flywheel": "18kg", "Resistance": "Adjustable", "Display": "LCD (speed/time/distance)", "Max Load": "120kg" },
  },

  // ── BABY PRODUCTS ─────────────────────────────
  {
    cat: "Baby Products",
    name: "Chicco Pocket Relax Baby Bouncer",
    brand: "Chicco",
    price: 38000,
    discountPrice: 30000,
    stock: 12,
    isFeatured: true,
    description: "Comfortable vibrating bouncer with removable toy bar. Suitable from birth.",
    images: ["https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=500&q=80"],
  },
  {
    cat: "Baby Products",
    name: "Fisher-Price Deluxe Kick & Play Piano Gym",
    brand: "Fisher-Price",
    price: 28000,
    discountPrice: 22500,
    stock: 20,
    isBestSeller: true,
    description: "5-in-1 baby gym with lights, music, and removable piano. Grows with your baby.",
    images: ["https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&q=80"],
  },
  {
    cat: "Baby Products",
    name: "Tommee Tippee Closer to Nature Complete Feeding Kit",
    brand: "Tommee Tippee",
    price: 14000,
    discountPrice: 11000,
    stock: 50,
    description: "Complete bottle feeding set including 3 bottles, brush, and bottle tongs.",
    images: ["https://images.unsplash.com/photo-1592085549561-e78ad4d1b49b?w=500&q=80"],
  },
  {
    cat: "Baby Products",
    name: "Graco Baby Slim Spaces Compact Baby Monitor",
    brand: "Graco",
    price: 42000,
    discountPrice: 35000,
    stock: 8,
    description: "Digital baby monitor with 900MHz DECT technology and long 300m range.",
    images: ["https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500&q=80"],
  },
  {
    cat: "Baby Products",
    name: "Carter's Baby 5-Piece Clothing Set (0-3M)",
    brand: "Carter's",
    price: 8500,
    discountPrice: 6800,
    stock: 80,
    isBestSeller: true,
    isFlashSale: true,
    description: "Adorable 5-piece set including bodysuits, pants, and hat in soft cotton.",
    images: ["https://images.unsplash.com/photo-1519689680058-324335c77eba?w=500&q=80"],
    variants: [{ name: "Size", options: ["Newborn", "0-3M", "3-6M", "6-9M", "9-12M"] }],
  },

  // ── GROCERY ───────────────────────────────────
  {
    cat: "Grocery",
    name: "Nestlé Milo Active Go (500g Tin)",
    brand: "Nestlé",
    price: 4500,
    discountPrice: 3800,
    stock: 200,
    isBestSeller: true,
    description: "Nigeria's favourite chocolate malt drink. Rich in vitamins and minerals for energy.",
    images: ["https://images.unsplash.com/photo-1504707748692-419802cf939d?w=500&q=80"],
  },
  {
    cat: "Grocery",
    name: "Indomie Instant Noodles Chicken Flavour (Box of 40)",
    brand: "Indomie",
    price: 14000,
    discountPrice: 11500,
    stock: 150,
    isBestSeller: true,
    isFlashSale: true,
    description: "Nigeria's favourite quick meal. Box of 40 packs with chicken seasoning.",
    images: ["https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=500&q=80"],
  },
  {
    cat: "Grocery",
    name: "Ariel Automatic Washing Powder (5kg)",
    brand: "Ariel",
    price: 12500,
    discountPrice: 10000,
    stock: 100,
    description: "Superior stain removal in 1 wash even in cold water. Best for washing machines.",
    images: ["https://images.unsplash.com/photo-1581600140682-d4e68c8cde32?w=500&q=80"],
  },
  {
    cat: "Grocery",
    name: "Knorr Chicken Seasoning Cubes (100 cubes)",
    brand: "Knorr",
    price: 3200,
    discountPrice: 2500,
    stock: 500,
    isBestSeller: true,
    description: "Rich, delicious flavour for all Nigerian soups and stews. Pack of 100 cubes.",
    images: ["https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=500&q=80"],
  },
  {
    cat: "Grocery",
    name: "Peak Instant Full Cream Milk Powder (900g)",
    brand: "Peak",
    price: 8500,
    discountPrice: 7200,
    stock: 180,
    description: "Nutrient-rich full cream milk powder. Great for tea, coffee, baking, and cereals.",
    images: ["https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&q=80"],
  },
  {
    cat: "Grocery",
    name: "Golden Penny Semolina (1kg) — 6 Pack",
    brand: "Golden Penny",
    price: 7800,
    discountPrice: 6500,
    stock: 120,
    isBestSeller: true,
    description: "Premium Nigerian semolina for smooth eba and swallow. Pack of 6 × 1kg bags.",
    images: ["https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80"],
  },
];

async function main() {
  console.log("🌱 ShopEase Seeder starting...\n");

  // ─── Admin user ─────────────────────────────────────────────
  const adminEmail = "admin@shopease.ng";
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        name: "ShopEase Admin",
        email: adminEmail,
        password: await bcrypt.hash("admin123", 10),
        role: "admin",
      },
    });
    console.log("✅ Admin user created: admin@shopease.ng / admin123");
  } else {
    console.log("ℹ️  Admin user already exists, skipping.");
  }

  // ─── Categories ─────────────────────────────────────────────
  const catMap = {};
  for (const cat of CATEGORIES) {
    const existing = await prisma.category.findFirst({ where: { name: cat.name } });
    if (existing) {
      catMap[cat.name] = existing.id;
      console.log(`ℹ️  Category already exists: ${cat.name}`);
    } else {
      const created = await prisma.category.create({ data: cat });
      catMap[cat.name] = created.id;
      console.log(`✅ Category created: ${cat.name}`);
    }
  }

  // ─── Products ───────────────────────────────────────────────
  console.log("\n📦 Seeding products...");
  let created = 0, skipped = 0;
  for (const prod of PRODUCTS) {
    const { cat, ...productData } = prod;
    const categoryId = catMap[cat];
    if (!categoryId) { console.warn(`⚠️  Category not found for: ${prod.name}`); continue; }

    const existing = await prisma.product.findFirst({ where: { name: productData.name } });
    if (existing) { skipped++; continue; }

    await prisma.product.create({
      data: {
        ...productData,
        categoryId,
        discountPercent: productData.discountPrice
          ? Math.round(((productData.price - productData.discountPrice) / productData.price) * 100)
          : null,
        description: productData.description || `${productData.name} — quality product from ShopEase Store.`,
      },
    });
    created++;
    process.stdout.write(`  ✅ ${productData.name}\n`);
  }

  console.log(`\n🎉 Seeding complete!`);
  console.log(`   Products created: ${created}`);
  console.log(`   Products skipped: ${skipped}`);
  console.log(`\n🔐 Admin login: admin@shopease.ng / admin123`);
}

main()
  .catch((e) => { console.error("❌ Seed failed:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
