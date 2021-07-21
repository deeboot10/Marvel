//loading carousel
const url = "https://gateway.marvel.com/v1/public/comics?limit=10&ts=188&apikey=6b0f6c9638b7d3ff95aaabc5fd7de77f&hash=dd6fc5f4a4328c39f2efb4ad248e3bc8&orderBy=-modified";
const carouselItem = document.querySelector(".carousel-content")
carouselArr = [];
const carousel = document.querySelector(".carousel-content");

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