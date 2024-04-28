const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bodyParser = require("body-parser");
const JWT = require("jsonwebtoken");
const app = express();
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");
app.use(bodyParser.json());
app.use(express.json());

// Get All Users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Single User
router.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updateUser = await User.findById(id);
    res.status(200).send({
      updateUser,
    });
    console.log(updateUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search Users
router.get("/search/:type", async (req, res) => {
  const searchType = req.params.type;
  const searchTerm = req.query.term;

  try {
    let users;

    switch (searchType) {
      case "name":
        users = await User.find({ name: searchTerm });
        break;
      case "email":
        users = await User.find({ email: searchTerm });
        break;
      case "phone":
        users = await User.find({ phone: searchTerm });
        break;
      default:
        return res.status(400).json({ error: "Invalid search type" });
    }

    res.status(200).send({
      users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Single User
router.delete("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).send({
      deletedUser,
    });
    console.log(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Single User
router.put("/user/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, accountno, balance, pin } = req.body;

  try {
    const singleUser = await User.findByIdAndUpdate(
      id,
      { name, email, phone, accountno, balance, pin },
      { new: true }
    );
    res.status(200).send({
      singleUser,
    });
    console.log(singleUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create User
router.post("/create", async (req, res) => {
  try {
    const { name, email, phone, accountno, balance, pin } = req.body;

    let newUser = await User.create({
      name,
      email,
      phone,
      accountno,
      balance,
      pin,
    });
    console.log(newUser);
    res.status(200).send({
      newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, pin } = req.body;
    // Validation
    if (!email || !pin) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    // Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    // Check pin
    if (user.pin !== pin) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    // Generate token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log(token);
    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        accountno: user.accountno,
        phone: user.phone,
        role: user.role,
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
});

//Services Routes

//Cash WithDrawal
router.put("/cashwithdrawal", async (req, res) => {
  const accountno = req.body.accountno;
  const pin = req.body.pin;
  const newBalance = req.body.newBalance;
  try {
    const user = await User.findOne({ accountno });
    if (!user) {
      return res.status(400).send({
        message: "Invalid User",
      });
    }
    if (user.pin !== pin) {
      return res.status(400).send({
        message: "Invalid Pin",
      });
    }
    if (user.balance < newBalance || newBalance < 0) {
      return res.status(400).send({
        message: "Insufficient balance for withdrawal",
      });
    }
    user.balance = user.balance - newBalance;
    await user.save();
    res.status(200).send({
      updatedUser: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Cash Deposit

router.put("/cashdeposit", async (req, res) => {
  const accountno = req.body.accountno;
  const pin = req.body.pin;
  const newBalance = req.body.newBalance;
  try {
    const user = await User.findOne({ accountno });
    if (!user) {
      return res.status(400).send({
        message: "Invalid User",
      });
    }
    if (user.pin !== pin) {
      return res.status(400).send({
        message: "Invalid Pin",
      });
    }
    if (newBalance < 0) {
      return res.status(400).send({
        message: "Insufficient balance for withdrawal",
      });
    }
    user.balance = user.balance + newBalance;
    await user.save();
    res.status(200).send({
      updatedUser: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Fund Transfer
router.put("/fundtransfer", async (req, res) => {
  const accountno = req.body.accountno;
  const pin = req.body.pin;
  const amount = req.body.amount;
  const ndAccount = req.body.ndAccount;

  try {
    const user = await User.findOne({ accountno });
    if (!user) {
      return res.status(400).send({
        message: "Invalid User",
      });
    }
    if (user.pin !== pin) {
      return res.status(400).send({
        message: "Invalid Pin",
      });
    }
    if (amount <= 0 && amount > user.balance) {
      return res.status(400).send({
        message: "Invalid balance for Transfer",
      });
    }
    if (accountno == ndAccount) {
      return res.status(400).send({
        message: "You can't transfer to yourself",
      });
    }

    const nduser = await User.findOne({ accountno: ndAccount });
    if (!nduser) {
      return res.status(400).send({
        message: "Invalid Destination User",
      });
    }

    try {
      nduser.balance = nduser.balance + amount;
      console.log(nduser.balance);
      await nduser.save();

      user.balance = user.balance - amount;
      await user.save();

      res.status(200).send({
        updatedUser: user,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error updating user balances",
        error: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get User Info for Fund Transfer
router.post("/fundtransfer", async (req, res) => {
  const { accountno, pin, amount, ndAccount } = req.body;

  try {
    const user = await User.findOne({ accountno });

    if (!user) {
      return res.status(400).send({ message: "Invalid User" });
    }

    if (user.pin !== pin) {
      return res.status(400).send({ message: "Invalid Pin" });
    }

    if (amount <= 0) {
      return res.status(400).send({ message: "Invalid balance for Transfer" });
    }

    if (accountno === ndAccount) {
      return res
        .status(400)
        .send({ message: "You can't transfer to yourself" });
    }
    const nduser = await User.findOne({ accountno: ndAccount });
    if (!nduser) {
      return res.status(400).send({ message: "Invalid Destination User" });
    }

    res.status(200).send({
      sender: user,
      receiver: nduser,
      amount: amount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Balance Inquiry
router.post("/balanceinquiry", async (req, res) => {
  const accountno = req.body.accountno;
  const pin = req.body.pin;
  try {
    const user = await User.findOne({ accountno });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid User",
      });
    }
    if (user.pin !== pin) {
      return res.status(400).json({
        success: false,
        message: "Invalid Pin",
      });
    }
    res.status(200).json({
      balance: user.balance,
      name: user.name,
    });
  } catch (error) {
    console.error("Error in balance inquiry:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

//Account Title
router.post("/accounttitle", async (req, res) => {
  const accountno = req.body.accountno;
  try {
    const user = await User.findOne({ accountno });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid User",
      });
    }

    res.status(200).json({
      name: user.name,
      id: user._id,
      accountno: user.accountno,
    });
  } catch (error) {
    console.error("Error in balance inquiry:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

//Change Pin Code
router.post("/changepin", async (req, res) => {
  const accountno = req.body.accountno;
  const pin = req.body.pin;
  const newPin = req.body.newPin;
  try {
    const user = await User.findOne({ accountno });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid User",
      });
    }
    if (user.pin != pin) {
      return res.status(400).json({
        success: false,
        message: "Invalid Pin",
      });
    }
    user.pin = newPin;
    await user.save();
    res.status(200).json({
      newPin: user.pin,
    });
  } catch (error) {
    console.error("Error in balance inquiry:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

//protected User route auth
router.get("/user", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected Admin route auth
router.get("/admin", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
module.exports = router;
