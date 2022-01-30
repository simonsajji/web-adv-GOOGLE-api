

let search=document.getElementById("search");
let search_results=document.getElementsByClassName("search_results")[0];

// Seaarch recomendations for default page.


let API_KEY='AIzaSyAG7keebzaN5xikXmYpGV83oGtxCj2mu_M';

let SEARCH_ENGINE_ID='ad2d6c1427eb695cc';

let searchbar=document.getElementById("searchbar");
let str="";
let new_str="";

let sList=[];

let sb=document.getElementsByClassName("search")[0];


searchbar.addEventListener("keyup",function(event){
    sb.src="./close.png";



    if(event.code === "Backspace" ){

        str= removefromList();
                // sList.pop();
        disp_string(str);
                
        
    }

});



searchbar.addEventListener("keydown",function(event){
    sb.src="./close.png";
    console.log(event);
    if(event.key !=undefined && event.code != "Backspace"){
        // str=str+event.key;
        str=addTolist(event.key);
        disp_string(str);
        
        

    }

    

    



});





// searchbar.addEventListener("onkeydown",function(event){

//     if(event.code === "Backspace" ){

//         str=removefromList();
//         // sList.pop();
        

//     }
//     if(str===""){
//         search_results.classList.add("hidden");

//     }

//     // disp_string();

// });
   
    
    
function addTolist(letter){
    new_str=""


    sList.push(letter);
    sList.forEach((l)=>{
        new_str=str+l;
    })
    return new_str;



}

function removefromList(){
    new_str=""
    sList.pop();
    sList.forEach((l)=>{
        new_str=new_str+l;
    });
    
    str=new_str.substring(0,str.length - 1);
    return str;
    // console.log(str);
    
}


//  str is the real-time substring that we need to search at realtime.

// We can make 3 max limit to fetch string ---------------------++++ NOTE


function disp_string(s){
    console.log(s);
    // console.log(s.length);

    if(s.length<=1){
        searchbar.value="";
        search_results.innerHTML="";
        search_results.classList.add("hidden");
        return;
       
    }

    else{

       
        let f= fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${s}`);

    f.then((response)=>{
        return response.json();
    }).then((data)=>{
        
        search_results.innerHTML="";


        

        if(data.items.length<1){
            return;
        }

    
            let len=data.items.length;
            if(len!=0){
                search_results.classList.remove("hidden");
                if(len>=6){
                    for(let i=0;i<6;i++){
                        let div=document.createElement("div");
                        div.textContent=data.items[i].title;
                        search_results.appendChild(div);
                      
                        let searchbar=document.getElementById("searchbar");
                        div.addEventListener("click",function(event){
                            searchbar.value=this.textContent;
                            console.log(searchbar.textContent);
                            search_results.classList.add("hidden");
                            search.addEventListener("click",function(){
                                window.location.href=`./google.html`;
                            });

                        });
        
                    }

                }
                else{
                    for(let i=0;i<len;i++){
                        let div=document.createElement("div");
                        div.textContent=data.items[i].title;
                        search_results.appendChild(div);
                      
                        let sbar=document.getElementById("searchbar");
                        div.addEventListener("click",function(event){
                            sbar.value=this.textContent;
                            console.log(sbar.textContent);
                            search_results.classList.add("hidden");
                            // search.addEventListener("click",function(){
                            //     window.location.href="./";
                            // });

                        });
        
                    }

                }
                
            }


        
       
       


    }).catch((err)=>{
        console.log(err);
        alert("The quota limit has exeeded its use!!");
    })


    }

    




}



sb.addEventListener("click",function(){
    searchbar.value="";
    searchbar.innerHTML="";
    str="";
})

// export default searchbar;

searchbar.addEventListener("focusout",function(){
    sb.src='./search.png';
    search_results.classList.add("hidden");

})








export { searchbar, search };