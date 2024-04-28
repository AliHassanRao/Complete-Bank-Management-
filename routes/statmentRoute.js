const express = require("express");
const router = express.Router();
const Statement = require("../models/statmentModel");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(express.json());

router.post("/statement", async (req, res) => {
  try {
    const { bankuser } = req.body;
    const allStatement = await Statement.find({ bankuser: bankuser });
    res.status(200).json(allStatement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




router.post("/createstatement", async (req, res) => {
  try {
    const { name, accountno, credit, debit, bankuser } = req.body;
    if (!(credit || debit)) {
      return res.status(400).send({ error: "Amount is required" });
    }
    const allStatement = await Statement.create({ name, accountno, credit, debit, bankuser });
    res.status(200).json(allStatement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Deleting user statements
router.delete("/statement", async (req, res) => {
  const { bankuser } = req.body;
  try {
    const deletedStatement = await Statement.deleteMany({ bankuser: bankuser });
    res.status(200).send({
      deletedStatement,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
