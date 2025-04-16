const {registerCustomer, verifyCustomerEmail, loginCustomer}= require("../services/customerServices")



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
    const user = await login_Customer(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports ={
    register_Customer,
    verify_CustomerEmail,
    login_Customer
}