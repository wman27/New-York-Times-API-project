const axios = require('axios')

export default class SearchArticles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query:"",
            article: [{
                abstract:"",
                web_url:"",
                headline: {
                    main: ""
                }
            }]
        };
        this.queryString = this.queryString.bind(this);
        this.searchInput = this.searchInput.bind(this);
        this.searchArticle = this.searchArticle.bind(this);
        this.errorHandle = this.errorHandle.bind(this);
        this.searchResults = this.searchResults.bind(this);
    };

    queryString(input) {
        return input.replace(" ","+");
    };

    searchInput(event) {
        this.setState({
            query: this.queryString(event.target.value)
        });
    }

    errorHandle(response) {
        if(response.statusText !== "OK"){
            document.getElementById("error").innerHTML="There was an error retrieving the data!";
        } else {
            document.getElementById("error").innerHTML=" ";
            return response;
        };
    }

    searchResults(result) {
        this.setState({
            article: result.data.response.docs
        });
        
    }

    async searchArticle() {
        await axios.post("/article-search-item", {
            search: this.state.query
        }) 
        .then(response => this.errorHandle(response))
        .then(response => this.searchResults(response))
    }

    render() {
        return (
            <div>
                <div className="container-fluid m-3">
                    <p id="">Search for articles about a topic from New York Times.</p>
                </div>

                <div className="container m-3">
                    <div className="row">
                        <div className="input-group col-sm-6">
                            <input type="text" className="form-control" onChange={this.searchInput} placeholder="Search"></input>
                            <div className="input-group-append">
                                <button type="button" className="btn btn-outline-secondary" onClick={this.searchArticle}>Search</button>
                            </div>
                        </div>
                    </div>  
                </div>

                <div className="container-fluid m-3">
                    <p id="error"></p>
                </div>

                <div className="container-fluid">
                    {this.state.article.map(article=>
                        <div className="card m-3" key={this.state.query+"_"+article.headline.main}>  
                            <div className="card-body">
                                <h5 className="card-title">{article.headline.main}</h5>
                                <p className="card-text">{article.abstract}</p>
                                <a href={article.web_url}>Read More</a>
                            </div> 
                        </div>
                    )}
                </div>
            </div>


        )
    }
}
