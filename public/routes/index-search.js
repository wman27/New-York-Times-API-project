const dotenv = require("dotenv");
dotenv.config();

const fetch = require("node-fetch");

module.exports = (app) => {
    
    // send top articles
    
    app.get("/index-search", (req,res) => {
        
        const api_key = process.env.REACT_APP_KEY;
        const ny_times_url = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=";
        const api_URL = ny_times_url + api_key;
        
        fetch(api_URL)
        .then(response => response.json())
        .then(data => res.send(data))
    })
    
}