const axios = require('axios')

export default class SearchBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{
                results:[{
                    list_name:"",
                    list_name_encoded:""
                }]
            },
            category:"",
            filtered_data:{
                books:[{
                    title:"",
                    description:"",
                    author:"",
                    amazon_product_url:""
                }]
            }
        };
        this.categoryNames = this.categoryNames.bind(this);   
        this.errorHandle = this.errorHandle.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.filter = this.filter.bind(this);
        this.filteredResults = this.filteredResults.bind(this);
    };

    categoryNames(response) {
        if(response !== undefined) {
            this.setState({
                data: response.data
            });
        };
    }
    
    errorHandle(response) {
        if(response.statusText !== "OK") {
            document.getElementById("error").innerHTML="There was an error retrieving the data!";
        } else {
            document.getElementById("error").innerHTML=" ";
            return response;
        };
    }
    
    selectCategory(event) {
            this.setState({
                category: event.target.value
            });
            
    }

    componentDidMount() {
        axios.get("/book-search-filter")
        .then(response=>this.errorHandle(response))
        .then(response=>this.categoryNames(response));
    }

    

    filteredResults(response) {
        this.setState({
            filtered_data:response.data.results
        });
        
    }
    
    async filter() {
        await axios.post("/book-search-filter-category", {
            category: this.state.category
        })
        .then(response => this.errorHandle(response))
        .then(response=>this.filteredResults(response))
    }

    
    render() {
        return(
            <div>
                <div className="container-fluid m-3">
                    <p id="">Search for the top 15 books from a selected category.</p>
                </div>

                <div className="container m-3">
                    <div className="row">
                        <form>
                            <div className="form-row m-3">
                                <div className="col-auto">

                                    <select className="form-control" name="category_name" onChange={this.selectCategory} value={this.state.category}>
                                        <option  value="">Select Category</option>
                                        {this.state.data.results.map(data => (
                                            <option id="category-id"  value={data.list_name_encoded} key={data.list_name_encoded}>{data.list_name}</option>
                                        ))}
                                    </select>

                                </div>
                                <div className="col-auto">
                                    <button className="btn btn-primary" type="button" onClick={this.filter}>Search</button>
                                </div>
                            </div>
                        </form>
                    </div> 
                </div>

                <div className="container-fluid m-3">
                    <p id="error"></p>
                </div>

                <div className="container-fluid">
                       
                    {this.state.filtered_data.books.map(book => (
                        <div className="card m-3" key={book.title+"_"+book.author}>
                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
                                <p className="card-text">{book.description}</p>
                                <p className="card-text "><small className="text-muted">Author: {book.author}</small></p>
                                <a href={book.amazon_product_url}>Amazon Link</a>
                            </div>
                        </div>
                    ))}
                </div>   
            </div>
        )
    }
    
}

