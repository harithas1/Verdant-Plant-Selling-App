require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma/prismaClient");
const sendEmail = require("../utils/mailer");
const { string } = require("joi");

const JWT_SECRET = process.env.JWT_SECRET;

// Register Customer
const registerCustomer = async ({ name, email, phone, password }) => {
  email = email.toLowerCase();

  // Check if email or phone already exists
  const existingCustomer = await prisma.customer.findFirst({
    where: {
      OR: [{ email }, { phone }],
    },
  });

  if (existingCustomer) throw new Error("Email or phone already registered!");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newCustomer = await prisma.customer.create({
    data: {
      name,
      email,
      phone,
      password: hashedPassword,
      emailVerified: false,
    },
  });

  const emailVerificationToken = jwt.sign(
    { customerId: newCustomer.id },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  const verificationLink = `https://verdant-plant-selling-app.onrender.com/api/auth/verify-email?token=${emailVerificationToken}`;
  const emailContent = `
    <h2>Welcome to Verdant Store!</h2>
    <p>Click the link below to verify your email:</p>
    <a href="₹ {verificationLink}">Verify Email</a>
  `;

  await sendEmail(newCustomer.email, "Verify Your Email", emailContent);

  return {
    message: "Registration successful! Please check your email to verify.",
  };
};

// Verify Email
const verifyCustomerEmail = async (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    await prisma.customer.update({
      where: { id: decoded.customerId },
      data: { emailVerified: true },
    });

    return { message: "Your email has been successfully verified!" };
  } catch (error) {
    throw new Error("Invalid or expired verification link.");
  }
};

// Customer Login
const loginCustomer = async ({ email, password }) => {
  // email = email.toLowerCase();

  const customer = await prisma.customer.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!customer) throw new Error("Invalid email or password.");

  const isValid = await bcrypt.compare(password, customer.password);
  if (!isValid) throw new Error("Invalid email or password.");

  if (!customer.emailVerified)
    throw new Error("Please verify your email before logging in.");

  const token = jwt.sign({ customerId: customer.id }, JWT_SECRET, {
    expiresIn: "7d",
  });

  // Update lastLogin timestamp
  await prisma.customer.update({
    where: { id: customer.id },
    data: { lastLogin: new Date() },
  });
  console.log("login successful");

  return { message: "Login successful!", token, customer };
};


const subscriptionService = async({email})=>{
  return await prisma.newsletterSubscription.create({
    data: {
      email: String(email)
    },
  });
}



module.exports = {
  registerCustomer,
  verifyCustomerEmail,
  loginCustomer,
  subscriptionService,
};
