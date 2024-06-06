const api_Key = "920a887aa9ab421687e0bbc35422ad0c";
const url = "https://newsapi.org/v2/everything";

async function fetchdata(query) {
    const res = await fetch(`${url}?q=${query}&apiKey=${api_Key}`);
    const data = await res.json();
    return data
   
}

fetchdata("all").then(data=>renderMain(data.articles))

let mobileMenu=document.querySelector(".mobile")
let menuBtn=document.querySelector(".menuBtn")
let menuBtnDisplay=true;

menuBtn.addEventListener("click",()=>{
   mobileMenu.classList.toggle("hidden")
})

function renderMain(arr){
   
    let mainHTML= ''
    for(let i=0;i<arr.length;i++){
        if(arr[i].urlToImage){
        mainHTML+=`<div class="card">
        <a href=${arr[i].url}>
        <img src=${arr[i].urlToImage}>
        <h3>${arr[i].title}</h3>
        <div class="date">
            <p>${arr[i].source.name}</p>
            <span>•</span>
            <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
        </div>
        <div{{ class="card-desc">
             ${arr[i].description}
        </div>
        </a>
    </div>`
    }
}
    document.querySelector("main").innerHTML=mainHTML
}

const searchBtn = document.getElementById("searchForm")
const searchBtnMobile = document.getElementById("searchFormMobile")
const searchInputMobile = document.getElementById("searchInputMobile")
const searchInput = document.getElementById("searchInput")

searchBtn.addEventListener("submit",async(e)=>{
    e.preventDefault()
    console.log(searchInput.value)
   const data=await fetchdata(searchInput.value)
   renderMain(data.articles)
})

searchBtnMobile.addEventListener("submit",async(e)=>{
    e.preventDefault()
    const data=await fetchdata(searchInputMobile.value)
    renderMain(data.articles)
}) 
async function Search(query){
    const data=await fetchdata(query)
    renderMain(data.articles)
}