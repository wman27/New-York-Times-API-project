const dotenv = require("dotenv");
dotenv.config();

const fetch = require("node-fetch");


module.exports = (app) => {

    // search filter names list
    app.get("/book-search-filter",(req,res) => {

        const ny_times_url = "https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=";
        const api_key = process.env.REACT_APP_KEY;
        const api_URL = ny_times_url + api_key;

        fetch(api_URL)
        .then(response => response.json())
        .then(data => res.send(data))
        
    });

    //user selected filter category

    app.post("/book-search-filter-category",(req,res) => {
        let category = req.body.category;
        
        const ny_times_url = "https://api.nytimes.com/svc/books/v3/lists/current/";
        const api_key = process.env.REACT_APP_KEY;
        const api_URL_filtered = ny_times_url + category + ".json?api-key=" + api_key;
        
        fetch(api_URL_filtered)
        .then(response => response.json())
        .then(data => res.send(data));
        
    });

}