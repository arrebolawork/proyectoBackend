require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/user", require("./routes/user.js"));
app.use("/product", require("./routes/products.js"));

app.listen(PORT, () => {
  console.log(`Servidor escuchando en ${PORT}`);
});
