const Transaction = require("../models/Transactions/index");
// Get All Transactions
// Router GET /api/v1/transactions
// Public

exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// Add Transactions
// Router POST /api/v1/transactions
// Public
exports.addTransactions = async (req, res, next) => {
  try {
    const { text, amount } = req.body;
    const transaction = await Transaction.create(req.body);

    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: message });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};

// Delete Transactions
// Router DELETE /api/v1/transactions/:id
// Public
exports.deleteTransactions = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: "No Transaction Found",
      });
    }
    await transaction.remove();
    return res.status(200).json({
      status: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
