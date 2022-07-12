const URL = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&meta=&generator=search&exchars=200&exlimit=10&exintro=1&explaintext=1&gsrsearch=";

const input = $("#search-input");
const clearBtn = $("#clear-btn");
const results = $("#results-section");
const loading = $("#loading");

const toggleLoading = (bool) => {
  if(bool)
    loading.css("display","unset");
  else
    loading.css("display","none");
}

const clearResults = () => {
  const articles = $(".article");
  if(articles.length){
    articles.remove();
    clearBtn.css("display","none");
  }
}

const fetchArticles = async() => {
  toggleLoading(true);
  clearResults();
  const res = await axios.get(URL+input.val());
  if("query" in res.data){
    const data = Object.values(res.data.query.pages)
      .map(article=>
          `<div class="article">
             <h2>${article.title}</h2>
             <p>
                ${article.extract}
                <a 
                  href="https://en.wikipedia.org/?curid=${article.pageid}"
                  target="_blank"
                  rel="noopener"
                >Read More?</a>
             </p>
           </div>`
      );
    results.append(data);
    clearBtn.css("display","unset");
  }
  input.val("");
  toggleLoading(false);
}

$(document).keydown(e=>{
  if(e.key==="Enter") {
    input.val(input.val().trim());
    if(/\S/.test(input.val()))
      fetchArticles();
  }
})

clearBtn.click(clearResults);