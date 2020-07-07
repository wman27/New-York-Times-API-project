import TopStories from "./index.js";
import SearchBooks from "./books.js";
import SearchArticles from "./articles.js";

function DisplayItem () {
    let display_value = document.getElementById("display").getAttribute("value");
    if (display_value == "top_stories") {
        return <TopStories />
    } else if ( display_value == "book_search") {
        return <SearchBooks />
    } else if ( display_value == "article_search") {
        return <SearchArticles />
    };
};
const element = <DisplayItem />
ReactDOM.render(element,document.getElementById("display"))