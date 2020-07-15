const express = require("express") ;
const app = express();
const port = process.env.PORT || 8080;
const dotenv = require("dotenv");
dotenv.config()

app.use(express.static(__dirname));
app.listen(port, () => console.log("server is running"))
