const dotenv = require("dotenv");
dotenv.config();

const fetch = require("node-fetch");

module.exports = (app) => {
    app.post("/article-search-item",(req,res) => {

        let search_query = req.body.search;
        const ny_times_url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=";
        const api_key = process.env.REACT_APP_KEY;

        const api_URL = ny_times_url+search_query+"&api-key="+api_key;

        fetch(api_URL)
        .then(response => response.text())
        .then(data => res.send(data))
    })

}