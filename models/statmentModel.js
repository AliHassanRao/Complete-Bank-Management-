const mongoose = require("mongoose");
const statementSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
  },
  accountno: {
    type: Number,
  
  },
  credit: {
    type: Number,
  },
  debit: {
    type: Number,
  },
  bankuser: {
    type: mongoose.ObjectId,
    ref: "users",
    required: true,
  },
});
const Statement = mongoose.model("Statement", statementSchema);

module.exports = Statement;
