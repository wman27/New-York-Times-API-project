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
                data: response
            });
        };
    }
    
    errorHandle(response) {
        if(!response.ok){
            document.getElementById("error").innerHTML="There was an error retrieving the data!";
        } else {
            document.getElementById("error").innerHTML=" ";
            return response.json();
        };
    }

    componentDidMount() {
        fetch(
            "https://api.nytimes.com/svc/books/v3/lists/names.json?api-key="+process.env.REACT_APP_KEY
            )
        .then(response=>this.errorHandle(response))
        .then(response=>this.categoryNames(response));
    }

    selectCategory(event) {
        this.setState({
            category: event.target.value
        });
    }

    filteredResults(response) {
        if(response !== undefined) {
            this.setState({
                filtered_data:response.results
            });
        };
    }
    
    filter() {
        let category = this.state.category;
        fetch(
            "https://api.nytimes.com/svc/books/v3/lists/current/"+category+".json?api-key="+process.env.REACT_APP_KEY
        ).then(response=>this.errorHandle(response))
        .then(response=>this.filteredResults(response))
        
    }

    
    render() {
        return(
            <div>
                <div className="container-fluid m-3">
                    <p id="">Search for the top 15 books from a specific category.</p>
                </div>

                <div className="container m-3">
                    <div className="row">
                        <div className="input-group col-sm-6">
                            <select className="custom-select" aria-label="Example select with button addon" onChange={this.selectCategory}>
                                <option value="" selected>Select Category</option>
                                {this.state.data.results.map(data => (
                                    <option id="category-id" value={data.list_name_encoded} key={data.list_name_encoded}>{data.list_name}</option>
                                ))}
                            </select>
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button" onClick={this.filter}>Search</button>
                            </div>
                        </div>
                    </div> 
                </div>

                <div className="container-fluid m-3">
                    <p id="error"></p>
                </div>

                <div className="container-fluid">              
                    {this.state.filtered_data.books.map(book =>
                        <div className="card m-3" key={book.title+"_"+book.author}>
                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
                                <p className="card-text">{book.description}</p>
                                <p className="card-text"><small className="text-muted">Author: {book.author}</small></p>
                                <a href={book.amazon_product_url}>Amazon Link</a>
                            </div>
                        </div>
                    )}
                </div>   
            </div>
        )
    }
    
}

