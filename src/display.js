import TopStories from "./index.js";
import SearchBooks from "./books.js";
import SearchArticles from "./articles.js";
import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
    <Router>
        <Route exact path="/" component={TopStories} />
        <Route exact path="/index.html" component={TopStories} />
        <Route exact path="/books.html" component={SearchBooks} />
        <Route exact path="/articles.html" component={SearchArticles} />
    </Router>
    , document.getElementById("display")
);
