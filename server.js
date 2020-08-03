const express = require("express") ;
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
app.use(express.urlencoded());

require("./public/routes/index-search")(app);
require("./public/routes/book-search")(app);
require("./public/routes/article-search")(app);

app.listen(port, () => console.log("server is running"));
