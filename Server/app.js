const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const postRoutes = require("./routes/posts");
const config = require("./config");

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/posts", postRoutes);

// Connect to MongoDB Atlas
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error(err));

// Start the server
const PORT = config.port;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
