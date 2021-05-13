const app = require("./server");

require("dotenv").config();
require("./database");

app.listen(process.env.PORT, () => {
  console.log("Server listening on port", process.env.PORT);
});
