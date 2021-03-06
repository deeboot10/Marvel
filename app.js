import { apiinfo } from "./apiinfo.js";

// dom elements
const charactersLink = document.querySelector(".characters");
const comicsLink = document.querySelector(".comics");
const charactersDiv = document.querySelector(".charsList");
const comicsDiv = document.querySelector(".comicsList");
const charactersContainer = document.querySelector(".characters-container");
const comicsContainer = document.querySelector(".comics-container");
const logo = document.querySelector(".logo svg");
const scrollLeft = document.getElementById("scrollLeft");
const scrollRight = document.getElementById("scrollRight");

if(window.innerWidth > 768){
  // showing menu on hover
  charactersLink.onmouseover = function(){
    charactersDiv.classList.remove("hidden");
  }
  charactersLink.onmouseout = function(){
    charactersDiv.classList.add("hidden");
  }
  comicsLink.onmouseover = function(){
    comicsDiv.classList.remove("hidden");
  }
  comicsLink.onmouseout = function(){
    comicsDiv.classList.add("hidden");
  }
}

let charactersArray = [];
let comicsArray = [];

let parameters = {
  limit: 6
}

// Fetching 6 latest and most popular comics/characters
axios.get(apiinfo.firstPartCharacters + apiinfo.createParams(parameters))
.then(function (response) {
  charactersArray = response.data.data.results;
  loadChars(charactersArray);
})
.catch(function (error) {
  // handle error
  console.log(error);
});
axios.get(apiinfo.firstPartComics + apiinfo.createParams(parameters))
.then(function (response) {
  comicsArray = response.data.data.results;
  loadComics(comicsArray);
})
.catch(function (error) {
  // handle error
  console.log(error);
});


// geting data to dom
function loadChars(characters){
  charactersContainer.innerHTML = "";
  for(let i = 0; i < 6; i++){
    let re = /\(\d{4}\)/;
    const char = characters[i];
    const html = `
      <a href="character.html?id=${char.id}">
        <div class="character-container">
        <img src="${char.thumbnail.path + "." + char.thumbnail.extension }">
        <p>${char.name}</p>
        </div>
      </a>`;
    charactersContainer.innerHTML += html;
  }
}
function loadComics(comics){
  comicsContainer.innerHTML = "";
  for(let i = 0; i < 6; i++){
    let re = /\(\d{4}\)/;
    const comic = comics[i];
    const html = `
      <a href="comic.html?id=${comic.id}">
        <div class="comic-container">
          <img src="${comic.thumbnail.path + "." + comic.thumbnail.extension }">
          <p>${comic.title}</p>
        </div>
      </a>`;
    comicsContainer.innerHTML += html;
  }
}


logo.onclick = () => {
  window.open("index.html","_self")
}

