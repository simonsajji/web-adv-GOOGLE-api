import {searchbar,search} from './recommendation.js'


let API_KEY='AIzaSyBUG91nEOxBkX-Tfg2me-6E3j7P0O3_w10';

let SEARCH_ENGINE_ID='ad2d6c1427eb695cc';

let main= document.getElementById("main");
let gsearch_container = document.getElementById("gsearch_container");

let searchbar_two=document.getElementById("searchbar_two");  // This is the searchbar for google result page .
let google_search=document.getElementById("search_two");

let content=document.getElementById("content");

search.addEventListener("click",function(){
    console.log("clicked");
    console.log(searchbar.value);
    displayGoogleSearch();
})



function displayGoogleSearch(){

    main.classList.add("hidden");
    gsearch_container.classList.remove("hidden");
    searchbar_two.value=searchbar.value;
    showResults();
    // Click on search_two search button
    google_search.addEventListener("click",showResults)






}


function showResults(){
    let query=searchbar_two.value;
    let f= fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}`);

    f.then((response)=>{
        return response.json();
    }).then((data)=>{
        console.log(data);
        content.innerHTML="";


    

        if(data.items.length<1){
            return;
        }

    
            let len=data.items.length;
            if(len!=0){      
                
                for(let i=0;i<len;i++){
                        let section=document.createElement("div");
                        let url=document.createElement("div");
                        let html_title=document.createElement("div");
                        let snippet=document.createElement("div");
                        url.innerHTML=data.items[i].htmlFormattedUrl;
                        html_title.innerHTML=data.items[i].htmlTitle;
                        snippet.innerHTML=data.items[i].htmlSnippet;

                        section.appendChild(url);
                        section.appendChild(html_title);
                        section.appendChild(snippet);
                        
                        content.appendChild(section);
                    
        
                }

                
                
            }


    
   

    }).catch((err)=>{
        console.log(err);
    })
}






