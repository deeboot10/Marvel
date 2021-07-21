import { apiinfo } from "./apiinfo.js";

//loading carousel
let params = {
  limit: 10,
  orderBy: "-modified"
}
const url = apiinfo.firstPartComics + apiinfo.createParams(params);
const carousel = document.querySelector(".carousel-content");
let carouselArr = [];

const scrollsize = window.innerWidth < 768 ? window.innerWidth - 130 : 980;
scrollLeft.onclick = () => { carousel.scroll(carousel.scrollLeft - scrollsize,0);}
scrollRight.onclick = () => { carousel.scroll(carousel.scrollLeft + scrollsize,0);}

axios.get(url)
.then(function (response) {
  console.log(response);
  carouselArr = response.data.data.results;
  loadCarousel(carouselArr);
})
.catch(function (error) {
  // handle error
  console.log(error);
});


function loadCarousel(all){
  document.querySelector(".carousel-content").innerHTML = "";
  for(let i = 0; i < 10; i++){
    let char = all[i];
    document.querySelector(".carousel-content").innerHTML += `
      <a class="carousel-content-item" href="comic.html?id=${char.id}">
        <img src="${char.thumbnail.path + "." + char.thumbnail.extension }">
        <span>${char.title}</span>
      </a>
    `;
  }
}