export default class TopStories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{
                results:[{
                    title:"",
                    abstract:"",
                    url:"",
                    published_date:""    
                }]
            }
        };
        this.articleData = this.articleData.bind(this);
        this.errorHandle = this.errorHandle.bind(this);
        this.parseDate = this.parseDate.bind(this);
    };

    articleData(newdata) {
        if(newdata !== undefined) {
            this.setState({
                data: newdata
            });
        };
    }

    errorHandle(response) {
        if(!response.ok){
            document.getElementById("error").innerHTML="There was an error retrieving the data!";
        } else {
            document.getElementById("error").innerHTML="";
            return response.json();
        };
    }
    parseDate(date) {
        let year = date.substring(0,4);
        let month = date.substring(5,7);
        let day = date.substring(8,10);
        return day+"/"+month+"/"+year;
    }
    componentDidMount() {
        fetch(      
            "/index-search"
        )
        .then(response => this.errorHandle(response))
        .then(response => this.articleData(response))
    }
    
     
    render() {
        return (
            <div>
                <div className="container-fluid">
                    <p id="error"></p>
                </div>
                
                <div className="container-fluid">
                    {this.state.data.results.map(articles=>
                        <div className="card m-3" key={articles.title+articles.published_date}>  
                            <div className="card-body">
                                <h5 className="card-title">{articles.title}</h5>
                                <p className="card-text">{articles.abstract}</p>
                                <p className="card-text"><small className="text-muted">Published {this.parseDate(articles.published_date)}</small></p>
                                <a href={articles.url}>Read More</a>
                            </div> 
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
