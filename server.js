const express = require("express");
const mongoose = require("mongoose");
const path=require("path");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoute");
const statmentRoutes = require("./routes/statmentRoute");
const {requireSignIn,isAdmin}=require('./middleware/authMiddleware')
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

app.use(userRoutes);
app.use(statmentRoutes);
app.use(express.static(path.join(__dirname,'./client/build')))

app.use('*',function(req, res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'))
});
const port = process.env.PORT || 8000;
app.listen(port, (err) => {
  if (err) {
    console.error("Error starting the server:", err.message);
  } else {
    console.log(`Server running on port ${port}`);
  }
});
