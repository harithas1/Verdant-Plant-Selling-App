const {
  registerCustomer,
  verifyCustomerEmail,
  loginCustomer,
  subscriptionService,
} = require("../services/customerServices");

const register_Customer = async (req, res) => {
  try {
    const user = await registerCustomer(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const verify_CustomerEmail = async (req, res) => {
  try {
    const response = await verifyCustomerEmail(req.query.token);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login_Customer = async (req, res) => {
  try {
    const user = await loginCustomer(req.body);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const subscription_Controller = async (req, res) => {
  try {
    const {email} = req.body;
    const response = await subscriptionService(email);
    res.status(200).json({ message: "Thank you", response });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register_Customer,
  verify_CustomerEmail,
  login_Customer,
  subscription_Controller,
};
