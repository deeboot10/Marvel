import { apiinfo } from "./apiinfo.js";

//dom elements
const allCharactersContainer = document.querySelector(".all-items");
const buttonContainer = document.querySelector(".button-container");
const pageTrack = document.querySelector(".button-container span");
const searchButton = document.getElementById("search-button");
const searchField = document.getElementById("search-field");
const loader = document.querySelector(".lds-dual-ring");
const filterSelect = document.getElementById("filter");
const nextButton = document.getElementById("next");
const backButton = document.getElementById("back");
const firstButton = document.getElementById("first");
const lastButton = document.getElementById("last");
hide(backButton);

//url options
let url = apiinfo.firstPartCharacters + apiinfo.lastPart;
let offset = 0;
let paginationProperty = ""; // &offset = offset
let total;
let isSearched = false;
let searchQuery = "";
let searchProperty = "";
let filter = "name"; // diff
let filterProperty = ""; // &orderBy = filter
let allCharacters = []; // place to store fetched data


// First grab of the data
callApi();


// searching ...
searchField.addEventListener("keyup", debounce(e => {
  searchQuery = searchField.value;
  if(searchQuery === ""){
    isSearched = false;
    callApi();
  } else{
    isSearched = true;
    show(loader);
    callApi();
  }
}, 500));

// filter
filterSelect.filter.onchange = ()=>{
  filter = filterSelect.filter.value;
  offset = 0;
  show(loader);
  callApi();
}

//next, back
nextButton.onclick = ()=>{
  offset += 20;
  show(backButton);
  show(loader);
  pageTrack.innerHTML = "Page " + (offset/20+1);
  callApi();
}
backButton.onclick = ()=>{
  offset -= 20;
  if(offset === 0) hide(backButton);
  show(loader);
  pageTrack.innerHTML = "Page " + (offset/20+1);
  callApi();
}
firstButton.onclick = () => {
  offset = 0;
  hide(backButton);
  show(loader);
  pageTrack.innerHTML = "Page " + (offset/20+1);
  callApi();
}
lastButton.onclick = () => {
  offset = total - (total % 20);
  show(loader);
  if(offset !== 0) show(backButton);
  pageTrack.innerHTML = "Page " + (offset/20+1);
  callApi();
}



//Helper functions
function show(el){
  el.classList.remove("hidden");
}
function hide(el){
  el.classList.add("hidden");
}
function callApi(){
  allCharactersContainer.innerHTML = "";

  if(isSearched) searchProperty = "&nameStartsWith=" + searchQuery; // diff
  else searchProperty = "";
  paginationProperty = "&offset=" + offset;
  filterProperty = "&orderBy=" + filter;


  axios.get(url + searchProperty + filterProperty + paginationProperty)
  .then(function (response) {
    allCharacters = response.data.data.results;
    loadAllChars(allCharacters);
    hide(loader);
    show(buttonContainer);
    total = response.data.data.total; 
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
}
//loading all grabbed data to the dom
function loadAllChars(all){
  allCharactersContainer.innerHTML = "";
  for(let i = 0; i < all.length; i ++){
    let char = all[i];
    let html = `
      <div class="item-container">
        <a href="character.html?id=${char.id}">
          <img src="${char.thumbnail.path}.${char.thumbnail.extension}">
          <h3>${char.name}</h3>
        </a>
      </div>
    `;
    allCharactersContainer.innerHTML += html;
  }
  pageTrack.innerHTML = "Page " + (offset/20+1);
}
// debounnce funcktion
function debounce(fn, delay) {
  let timeoutId;
  return function(...args){
    if(timeoutId){
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay)
  }
}