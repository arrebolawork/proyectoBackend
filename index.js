const express = require("express");
const app = express();
const PORT = 3000;
const { typeError } = require("./middleware/errors");
app.use(express.json());

app.use("/user", require("./routes/user.js"));
app.use("/product", require("./routes/products.js"));
app.use("/category", require("./routes/category.js"));
app.use("/order", require("./routes/order.js"));
app.use("/review", require("./routes/review.js"));

app.use(typeError);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en ${PORT}`);
});
