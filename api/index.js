require("dotenv").config();

const app = require("./app");
require("./router")(app);

const { PORT = 8080, LOCAL_ADDRESS = "localhost" } = process.env;

app.listen(PORT, LOCAL_ADDRESS, () => {
  console.log(`Server is running on http://${LOCAL_ADDRESS}:${PORT}`);
});