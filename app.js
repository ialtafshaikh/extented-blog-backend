const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = 3000;
const app = express();

//root folder for the app is public
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Listeninig on Port http://localhost:${PORT}`);
});
