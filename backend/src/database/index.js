const mongoose = require("mongoose");

const URI = process.env.URI;

mongoose
  .connect(URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB conected");
  })
  .catch((err) => {
    console.log("DB error:", err);
  });
