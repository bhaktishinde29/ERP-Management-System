const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

mongoose.connect("YOUR_MONGO_URI");

async function seed() {
  await User.deleteMany({});

  await User.create([
    {
      email: "admin@gmail.com",
      password: await bcrypt.hash("123456", 10),
      role: "admin",
    },
    {
      email: "hr@gmail.com",
      password: await bcrypt.hash("123456", 10),
      role: "hr",
    },
    {
      email: "emp@gmail.com",
      password: await bcrypt.hash("123456", 10),
      role: "employee",
    },
  ]);

  console.log("Seed completed");
  mongoose.disconnect();
}

seed();