const prisma = require("./config/prisma");
const bcrypt = require("bcryptjs");

async function importData() {
  try {
    // Clear existing data
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.review.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
    await prisma.deliveryRegion.deleteMany();
    await prisma.resellerApplication.deleteMany();

    console.log("Data cleared!");

    // Create Admin User
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);
    
    const admin = await prisma.user.create({
      data: {
        name: "Admin User",
        email: "admin@shopease.com",
        password: hashedPassword,
        role: "admin",
      }
    });

    console.log("Admin user created!");

    // Create Categories
    const catTech = await prisma.category.create({ data: { name: "Technology Gadgets", description: "Phones, tablets, etc." } });
    const catWatch = await prisma.category.create({ data: { name: "Smartwatches", description: "Wearables" } });
    const catAcc = await prisma.category.create({ data: { name: "Phone Accessories", description: "Cases, chargers" } });

    console.log("Categories created!");

    // Create Delivery Regions
    await prisma.deliveryRegion.createMany({
      data: [
        { name: "Lagos - Island", baseFee: 2000, estimatedDays: "1-2 days" },
        { name: "Lagos - Mainland", baseFee: 3000, estimatedDays: "1-2 days" },
        { name: "Abuja", baseFee: 4500, estimatedDays: "2-4 days" },
        { name: "Other States", baseFee: 5000, estimatedDays: "3-5 days" },
      ]
    });

    console.log("Delivery regions created!");

    // Create Products
    await prisma.product.create({
      data: {
        name: "Phonekit X1",
        description: "The ultimate phone vlogging kit",
        price: 25000,
        categoryId: catAcc.id,
        stock: 50,
        images: ["https://via.placeholder.com/300?text=Phonekit"],
        freeGifts: [
          { name: "Ring Light", description: "Mini ring light", quantity: 1 }
        ]
      }
    });

    await prisma.product.create({
      data: {
        name: "Y13 Smartwatch",
        description: "Premium smartwatch with health tracking",
        price: 35000,
        discountPrice: 29999,
        categoryId: catWatch.id,
        stock: 30,
        images: ["https://via.placeholder.com/300?text=Y13+Smartwatch"],
      }
    });

    console.log("Products imported!");
    console.log("Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
}

importData();
